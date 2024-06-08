/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchComments } from "../services/api";
import { Comment } from "../types";

interface RouteParams extends Record<string, string | undefined> {
  params: string | undefined;
}
const CommentsPage: React.FC = () => {
  const { postId } = useParams<RouteParams>();
  const [comments, setComments] = useState<Comment[]>([]);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(20);
  const [loading, setLoading] = useState<boolean>(false);

  const loadComments = useCallback(async () => {
    if (loading || !postId) return;
    setLoading(true);
    if (limit === 20) {
      setLimit(10);
    }
    try {
      const response = await fetchComments(parseInt(postId), page, limit);
      setComments((prevComments) => [...prevComments, ...response.data]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    loadComments();
  }, []);

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
        {comments.map((comment) => (
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
