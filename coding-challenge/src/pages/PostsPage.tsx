/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Header from "../components/header/Header";
import Loader from "../components/loader/Loader";
import PostCard from "../components/post-card/PostCard";
import {
  incrementPage,
  loadPosts,
  resetPage,
  resetPosts,
  setPageSize,
} from "../store/postsSlice";
import { AppDispatch, RootState } from "../store/store";
import { Post } from "../types";

const PostsPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { posts, total, loading, pageSize } = useSelector(
    (state: RootState) => state.posts
  );
  const params = useParams<{ userId: string }>();

  useEffect(() => {
    dispatch(resetPage());
    dispatch(resetPosts());
    dispatch(loadPosts(undefined));
    if (pageSize === 20) dispatch(setPageSize(10));
  }, [params]);

  useEffect(() => {
    const postElements = document.querySelectorAll(".post");
    if (postElements.length < 4) return;

    const fourthLastPostElement = postElements[postElements.length - 4];

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && posts.length < total) {
          dispatch(incrementPage());
          dispatch(loadPosts());
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
  }, [posts, loading, total, dispatch]);

  return (
    <div className="min-h-screen w-full posts-page">
      <Header>
        <h2 className="flex justify-center items-center text-3xl font-bold text-white mb-6 mt-4">
          Your Feed
        </h2>
      </Header>
      <ul className="flex flex-col items-center">
        {posts.map((post: Post) => (
          <PostCard post={post} />
        ))}
      </ul>
      {loading && <Loader />}
    </div>
  );
};

export default PostsPage;
