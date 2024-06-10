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

const ProfilePage: React.FC = () => {
  const params = useParams<{ userId: string }>();
  const dispatch: AppDispatch = useDispatch();
  const { posts, total, loading, pageSize } = useSelector(
    (state: RootState) => state.posts
  );
  const { users } = useSelector((state: RootState) => state.users);
  const currentUser = users.find((user) => user.id === Number(params.userId));

  useEffect(() => {
    dispatch(setPageSize(20));
    dispatch(resetPage());
    dispatch(resetPosts());
    dispatch(loadPosts(Number(params.userId)));
    dispatch(setPageSize(10));
  }, [params]);

  useEffect(() => {
    const postElements = document.querySelectorAll(".post");
    if (postElements.length < 4) return;

    const fourthLastPostElement = postElements[postElements.length - 4];

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && posts.length < total) {
          if (pageSize === 20) dispatch(setPageSize(10));

          dispatch(incrementPage());
          dispatch(loadPosts(Number(params.userId)));
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
    <div className="min-h-screen w-full">
      <Header hasGoBack>
        <span className="flex flex-col gap-1 justify-start items-start">
          <h2 className="text-3xl font-bold text-white">{currentUser?.name}</h2>
          <h4 className="text-sm text-neutral-400">@{currentUser?.username}</h4>
        </span>
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

export default ProfilePage;
