/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
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

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (
  //       window.innerHeight + document.documentElement.scrollTop !==
  //         document.documentElement.offsetHeight ||
  //       loading
  //     ) {
  //       return;
  //     }
  //     loadComments();
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, [loadComments, loading]);

  return (
    <div>
      <h2>Comments for Post {postId}</h2>
      <ul>
        {comments.map((comment: Comment) => (
          <li key={`comment-${comment.id}`}>
            <p>{comment.body}</p>
            <p>By: {comment.email}</p>
          </li>
        ))}
      </ul>
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default CommentsPage;
