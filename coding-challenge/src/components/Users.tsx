/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { AppDispatch, RootState } from "../store/store";
import { loadUsers } from "../store/usersSlice";

const OtherUsers: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { users, loading } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    dispatch(loadUsers());
  }, [dispatch]);

  return (
    <aside
      className="fixed top-0 right-0 w-[28rem] h-full p-12 flex flex-col gap-3 items-center justify-center border-l-[1px] border-neutral-500 bg-gray-800"
      aria-label="right-Sidebar"
    >
      <div className="flex flex-col gap-3 items-center justify-start w-full">
        {users.map((user: any) => (
          <NavLink
            key={`otherUsers-${user.id}`}
            to={`/profile/${user.id}`}
            end
            className={
              "flex text-white mx-2 gap-4 text-left items-center text-sm rounded-full w-full p-3 hover:bg-gray-700 transition duration-300 ease-in-out cursor-pointer"
            }
          >
            <span className="rounded-full bg-neutral-500 w-10 h-10 flex-shrink-0"></span>
            <span className="flex flex-col flex-grow">
              <span className="text-sm">{user.name}</span>
              <span className="text-neutral-400">@{user.username}</span>
            </span>
            <span className="rounded-full bg-white text-gray-800 p-2 w-20 text-center font-bold flex-shrink-0">
              View
            </span>
          </NavLink>
        ))}
      </div>
      {loading && <p>Loading...</p>}
    </aside>
  );
};

export default OtherUsers;
