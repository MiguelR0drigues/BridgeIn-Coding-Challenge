import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { myUserId } from "../../constants";
import { addPost } from "../../store/postsSlice";
import { HomeIcon, UserIcon } from "../../theme/icons";
import { Post } from "../../types";
import PostDialog from "../post-dialog/PostDialog";

const Navigation: React.FC = () => {
  const dispatch = useDispatch();

  const handleAddPost = (newPost: Post) => {
    dispatch(addPost(newPost));
  };

  return (
    <aside
      className="w-full h-full p-12 flex flex-col gap-3 items-center justify-center border-r-[1px] border-neutral-500 bg-gray-800"
      aria-label="Sidebar"
    >
      <nav className="flex flex-col gap-3 items-center justify-start">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `flex text-white mx-2 gap-4 text-left items-center text-xl rounded-full w-36 p-3 pl-4 hover:bg-gray-700 transition duration-300 ease-in-out ${
              isActive ? "font-bold" : ""
            }`
          }
        >
          <HomeIcon className="w-6" />
          Posts
        </NavLink>
        <NavLink
          to={`/profile/${myUserId}`}
          end
          className={({ isActive }) =>
            `flex text-white mx-2 gap-4 text-left items-center text-xl rounded-full w-36 p-3 pl-4 hover:bg-gray-700 transition duration-300 ease-in-out ${
              isActive ? "font-bold" : ""
            }`
          }
        >
          <UserIcon className="w-6" />
          Profile
        </NavLink>
        <PostDialog
          triggerClasses="flex text-white mx-2 gap-4 text-center items-center justify-center text-lg font-bold rounded-full w-36 p-3 pl-4 hover:bg-blue-700 bg-blue-500 transition duration-300 ease-in-out"
          triggerLabel="New Post"
          title="New Post"
          onSubmit={handleAddPost}
        />
      </nav>
    </aside>
  );
};

export default Navigation;
