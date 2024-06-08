/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchPosts } from "../services/api";
import { Post } from "../types";

const PostsPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const loadPosts = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    if (pageSize === 20) {
      setPageSize(10);
    }
    try {
      const response = await fetchPosts(page, pageSize);
      setPosts((prevPosts) => [...prevPosts, ...response.data]);
      setTotal(parseInt(response.headers["x-total-count"], 10));
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  }, [loading, page, pageSize]);

  useEffect(() => {
    loadPosts();
  }, []);
  useEffect(() => {
    const postElements = document.querySelectorAll(".post");
    if (postElements.length < 4) return;

    const fourthLastPostElement = postElements[postElements.length - 4];

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && posts.length < total) {
          loadPosts();
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    if (fourthLastPostElement) {
      observer.observe(fourthLastPostElement);
    }

    return () => {
      if (fourthLastPostElement) {
        observer.unobserve(fourthLastPostElement);
      }
    };
  }, [posts, loadPosts, loading, total]);

  return (
    <div className="bg-gray-900 p-4 min-h-screen">
      <h2 className="text-3xl font-bold text-white mb-6">Your Feed</h2>
      <ul className="flex flex-col gap-4">
        {posts.map((post) => (
          <li
            key={`post-${post.id}-${post.userId}`}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
          >
            <Link
              to={`/posts/${post.id}/comments`}
              className="text-xl font-semibold text-blue-400 hover:text-blue-300"
            >
              {post.title}
            </Link>
            <p className="text-gray-700 mt-2">{post.body}</p>
          </li>
        ))}
      </ul>
      {loading && <p className="text-white mt-4">Loading...</p>}
    </div>
  );
};

export default PostsPage;
