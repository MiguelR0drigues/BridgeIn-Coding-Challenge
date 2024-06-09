import React from "react";
import { Route, Routes } from "react-router-dom";
import "../index.css";
import CommentsPage from "../pages/CommentsPage";
import PostsPage from "../pages/PostsPage";
const Callback: React.FC = () => <div>Callback Page</div>;
const Profile: React.FC = () => <div>Profile Page</div>;

const Main: React.FC = () => {
  return (
    <Routes>
      <Route index path="/" element={<PostsPage />} />
      <Route path="/:postId/comments" element={<CommentsPage />} />
      <Route path="/profile/:userId" element={<Profile />} />
      <Route path="/callback" element={<Callback />} />
    </Routes>
  );
};

export default Main;
