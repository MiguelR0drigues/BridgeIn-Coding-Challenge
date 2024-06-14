/* eslint-disable react-hooks/exhaustive-deps */
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

const ProfilePage: React.FC = () => {
  const params = useParams<{ userId: string }>();
  const dispatch = useDispatch();
  const { posts, total, loading, pageSize, cachedPosts } = useSelector(
    (state: RootState) => state.posts
  );
  const { users } = useSelector((state: RootState) => state.users);
  const currentUser = users.find((user) => user.id === Number(params.userId));

  useEffect(() => {
    dispatch(resetPage());
    dispatch(resetPosts());
    //@ts-expect-error: UnknownAction error
    dispatch(loadPosts(Number(params.userId)));
    if (pageSize === 20) dispatch(setPageSize(10));
  }, [params]);

  useEffect(() => {
    // IntersectionObserver setup
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && posts.length < total) {
          if (pageSize === 20) dispatch(setPageSize(10));

          dispatch(incrementPage());
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    const postElements = document.querySelectorAll(".post");
    if (postElements.length < 4) return;

    const fourthLastPostElement = postElements[postElements.length - 4];
    if (fourthLastPostElement) {
      observer.observe(fourthLastPostElement);
    }

    return () => {
      if (fourthLastPostElement) {
        observer.unobserve(fourthLastPostElement);
      }
    };
  }, [posts, loading, total, pageSize, dispatch]);

  useEffect(() => {
    if (posts.length > 0 && cachedPosts.length > 0) {
      dispatch(mergeCachedPosts());
    }
  }, []);

  const userPosts = posts.filter(
    (post) => post.userId === Number(params.userId)
  );

  return (
    <div className="min-h-screen w-full">
      <Header hasGoBack>
        <span className="flex flex-col gap-1 justify-start items-start">
          <h2 className="text-3xl font-bold text-white">{currentUser?.name}</h2>
          <h4 className="text-sm text-neutral-400">
            {currentUser?.username ? `@${currentUser?.username}` : null}
          </h4>
        </span>
      </Header>
      <ul className="flex flex-col items-center">
        {userPosts.length > 0
          ? userPosts.map((post: Post) => <Card key={post.id} post={post} />)
          : !loading && <EmptyState />}
      </ul>
      {loading && <Loader />}
    </div>
  );
};

export default ProfilePage;
