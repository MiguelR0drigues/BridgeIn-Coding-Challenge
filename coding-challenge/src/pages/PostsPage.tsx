/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { incrementPage, loadPosts, setPageSize } from "../store/postsSlice";
import { AppDispatch, RootState } from "../store/store";
import { Post } from "../types";

const PostsPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { posts, total, loading, pageSize } = useSelector(
    (state: RootState) => state.posts
  );
  const { usersMap } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    if (pageSize === 20) dispatch(setPageSize(10));
    dispatch(loadPosts());
  }, []);

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
    <div className="min-h-screen w-full">
      <h2 className="w-full flex justify-center items-center text-3xl font-bold text-white mb-6 mt-4">
        Your Feed
      </h2>
      <ul className="flex flex-col items-center">
        {posts.map((post: Post) => (
          <li
            key={`post-${post.id}-${post.userId}`}
            className="post h-40 w-full flex flex-col justify-center items-center border-t-[1px] shadow-md p-12 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="w-full flex items-center justify-center ml-[-450px]">
              <span className="flex flex-row gap-2 items-center justify-center text-center">
                <span
                  className={`rounded-full w-10 h-10 flex-shrink-0 mb-[-30px] text-center flex items-center justify-center`}
                  style={{ backgroundColor: usersMap[post.userId]?.color }}
                >
                  {usersMap[post.userId]?.name.split("")[0]}
                </span>
                <span className="text-lg font-bold">
                  {usersMap[post.userId]?.name}
                </span>
                <span className="text-neutral-400 text-lg">
                  @{usersMap[post.userId]?.username}
                </span>
              </span>
            </div>
            <div className="flex flex-col justify-center items-center w-full">
              <Link
                to={`/${post.id}/comments`}
                className="max-w-[600px] text-xl font-semibold text-blue-400 hover:text-blue-300 first-letter:capitalize text-center"
              >
                {post.title}
              </Link>
              <p className="mt-2 max-w-[600px] text-wrap text-justify first-letter:capitalize">
                {post.body}
              </p>
            </div>
          </li>
        ))}
      </ul>
      {loading && <p className="text-white mt-4">Loading...</p>}
    </div>
  );
};

export default PostsPage;
