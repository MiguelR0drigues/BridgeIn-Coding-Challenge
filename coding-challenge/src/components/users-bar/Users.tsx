import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { myUserId } from "../../constants";
import { AppDispatch, RootState } from "../../store/store";
import { loadUsers } from "../../store/usersSlice";
import { User } from "../../types";

const OtherUsers: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { users, loading } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    dispatch(loadUsers());
  }, [dispatch]);

  return (
    <aside
      className="w-full h-full p-12 flex flex-col gap-3 items-center justify-center border-l-[1px] border-neutral-500 bg-gray-800"
      aria-label="right-Sidebar"
    >
      <div className="flex flex-col gap-3 items-center justify-start w-full">
        {users
          .filter((user) => user.id !== myUserId)
          .map((user: User) => (
            <NavLink
              key={`otherUsers-${user.id}`}
              to={`/profile/${user.id}`}
              end
              className={
                "flex text-white mx-2 gap-4 text-left items-center text-sm rounded-full w-full p-3 hover:bg-gray-700 transition duration-300 ease-in-out cursor-pointer"
              }
            >
              <span
                className="rounded-full w-10 h-10 flex-shrink-0 text-center flex items-center justify-center hover:brightness-75 duration-300 ease-in-out z-10"
                style={{ backgroundColor: user.color }}
              >
                {user.name.split("")[0]}
              </span>
              <span className="flex flex-col flex-grow">
                <span className="text-sm font-bold hover:underline">
                  {user.name}
                </span>
                <span className="text-neutral-400">@{user.username}</span>
              </span>
              <span className="rounded-full bg-white text-gray-800 p-2 w-20 text-center font-bold flex-shrink-0 hover:brightness-75 duration-300 ease-in-out">
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
