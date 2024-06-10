import React from "react";
import { NavLink } from "react-router-dom";
import { HomeIcon, UserIcon } from "../assets/icons";
import { myUserId } from "../constants";

const Navigation: React.FC = () => {
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
        <button className="flex text-white mx-2 gap-4 text-center items-center justify-center text-lg font-bold rounded-full w-36 p-3 pl-4 hover:bg-blue-700 bg-blue-500 transition duration-300 ease-in-out">
          New Post
        </button>
      </nav>
    </aside>
  );
};

export default Navigation;
