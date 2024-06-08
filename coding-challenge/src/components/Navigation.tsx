import React from "react";
import { NavLink } from "react-router-dom";

const Navigation: React.FC = () => {
  return (
    <aside className="w-64" aria-label="Sidebar">
      <nav className="bg-gray-800 p-2">
        <NavLink to="/posts" end className="text-white mx-2">
          Posts
        </NavLink>
      </nav>
    </aside>
  );
};

export default Navigation;
