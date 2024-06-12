/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Card from "../components/card/Card";
import Header from "../components/header/Header";
import Loader from "../components/loader/Loader";
import { loadComments, setLimit } from "../store/commentsSlice";
import { AppDispatch, RootState } from "../store/store";
import { Comment } from "../types";

interface RouteParams extends Record<string, string | undefined> {
  postId: string | undefined;
}

const CommentsPage: React.FC = () => {
  const { postId } = useParams<RouteParams>();
  const dispatch: AppDispatch = useDispatch();
  const { comments, loading, limit } = useSelector(
    (state: RootState) => state.comments
  );

  useEffect(() => {
    if (limit === 20) dispatch(setLimit(10));
    if (postId) dispatch(loadComments(parseInt(postId)));
  }, [postId]);

  return (
    <div className="min-h-screen w-full posts-page">
      <Header>
        <span className="flex flex-col gap-1 justify-start items-start">
          <h2 className="text-3xl font-bold text-white">
            Comments for {postId}
          </h2>
        </span>
      </Header>
      <ul className="flex flex-col items-center">
        {comments.map((comment: Comment) => (
          <Card key={comment.id} comment={comment} />
        ))}
      </ul>
      {loading && <Loader />}
    </div>
  );
};

export default CommentsPage;
