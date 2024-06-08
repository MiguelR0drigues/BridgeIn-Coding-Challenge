import React from "react";
import { Route, Routes } from "react-router-dom";
import "../index.css";
import CommentsPage from "../pages/CommentsPage";
import PostsPage from "../pages/PostsPage";
const Home: React.FC = () => <div>Home Page</div>;
const Callback: React.FC = () => <div>Callback Page</div>;

const Main: React.FC = () => {
  return (
    <Routes>
      <Route index path="/" element={<Home />} />
      <Route path="/posts" element={<PostsPage />} />
      <Route path="/posts/:postId/comments" element={<CommentsPage />} />
      <Route path="/callback" element={<Callback />} />
    </Routes>
  );
};

export default Main;
