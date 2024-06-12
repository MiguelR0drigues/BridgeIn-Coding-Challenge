/* eslint-disable react-hooks/exhaustive-deps */
// PostsPage.tsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Card from "../components/card/Card";
import EmptyState from "../components/empty-state/EmptyState";
import Header from "../components/header/Header";
import Loader from "../components/loader/Loader";
import {
  incrementPage,
  loadPosts,
  mergeCachedPosts,
  resetPage,
  resetPosts,
  setPageSize,
} from "../store/postsSlice";
import { RootState } from "../store/store";
import { Post } from "../types";

const PostsPage: React.FC = () => {
  const dispatch = useDispatch();
  const { posts, cachedPosts, total, loading, pageSize, page } = useSelector(
    (state: RootState) => state.posts
  );
  const params = useParams<{ userId: string }>();

  useEffect(() => {
    dispatch(resetPage());
    dispatch(resetPosts());
    //@ts-expect-error: UnknownAction error
    dispatch(loadPosts(undefined));
    if (pageSize === 20) dispatch(setPageSize(10));
  }, [params]);

  useEffect(() => {
    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && !loading && posts.length < total) {
        dispatch(incrementPage());
      }
    };

    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver(handleObserver, options);
    const postElements = document.querySelectorAll(".post");
    const fourthLastPostElement = postElements[postElements.length - 4];

    if (fourthLastPostElement) {
      observer.observe(fourthLastPostElement);
    }

    return () => {
      if (fourthLastPostElement) {
        observer.unobserve(fourthLastPostElement);
      }
    };
  }, [posts, loading, total, dispatch]);

  useEffect(() => {
    if (cachedPosts.length > 0) {
      dispatch(mergeCachedPosts());
    }
  }, []);

  useEffect(() => {
    if (page > 1) {
      //@ts-expect-error: UnknownAction error
      dispatch(loadPosts(undefined));
    }
  }, [page]);

  return (
    <div className="min-h-screen w-full posts-page">
      <Header>
        <h2 className="flex justify-center items-center text-3xl font-bold text-white mb-6 mt-4">
          Your Feed
        </h2>
      </Header>
      <ul className="flex flex-col items-center">
        {posts.length > 0
          ? posts.map((post: Post) => <Card key={post.id} post={post} />)
          : !loading && <EmptyState />}
      </ul>
      {loading && <Loader />}
    </div>
  );
};

export default PostsPage;
