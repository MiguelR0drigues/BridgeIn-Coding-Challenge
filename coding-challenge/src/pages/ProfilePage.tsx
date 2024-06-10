/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
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
  const { users, usersMap } = useSelector((state: RootState) => state.users);
  const currentUser = users.find((user) => user.id === Number(params.userId));

  useEffect(() => {
    dispatch(resetPage());
    dispatch(resetPosts());
    dispatch(loadPosts(Number(params.userId)));
    if (pageSize === 20) dispatch(setPageSize(10));
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
      <header className="w-full flex flex-col gap-2 justify-center items-center">
        <h2 className="text-3xl font-bold text-white">{currentUser?.name}</h2>
        <h4 className="text-sm text-neutral-400">@{currentUser?.username}</h4>
      </header>
      <ul className="flex flex-col items-center">
        {posts.map((post: Post) => (
          <Link
            key={`post-${post.id}-${post.userId}`}
            to={`/${post.id}/comments`}
            className="post h-40 w-full flex flex-col justify-center items-center border-t-[1px] shadow-md p-12 cursor-pointer hover:bg-gray-700 hover:shadow-lg transition duration-300 ease-in-out"
          >
            <div className="w-full flex items-center justify-center ml-[-450px]">
              <span className="flex flex-row gap-2 items-end justify-center text-center">
                <Link
                  to={`/profile/${post.userId}`}
                  className={`rounded-full w-10 h-10 flex-shrink-0 mb-[-30px] text-center flex items-center justify-center hover:brightness-75 duration-300 ease-in-out z-10`}
                  style={{ backgroundColor: usersMap[post.userId]?.color }}
                >
                  {usersMap[post.userId]?.name.split("")[0]}
                </Link>
                <Link
                  to={`/profile/${post.userId}`}
                  className="text-lg font-bold hover:underline "
                >
                  {usersMap[post.userId]?.name}
                </Link>
                <span className="text-neutral-400 text-[16px]">
                  @{usersMap[post.userId]?.username}
                </span>
              </span>
            </div>
            <div className="flex flex-col justify-center items-center w-full">
              <Link
                to={`/${post.id}/comments`}
                className="max-w-[600px] text-xl font-semibold text-blue-400 hover:text-blue-300 first-letter:capitalize text-center hover:underline "
              >
                {post.title}
              </Link>
              <p className="mt-2 max-w-[600px] text-wrap text-justify first-letter:capitalize">
                {post.body}
              </p>
            </div>
          </Link>
        ))}
      </ul>
      {loading && <p className="text-white mt-4">Loading...</p>}
    </div>
  );
};

export default ProfilePage;
