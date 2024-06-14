import React from "react";
import { Route, Routes } from "react-router-dom";
import "../../index.css";
import CommentsPage from "../../pages/CommentsPage";
import NotFoundPage from "../../pages/NotFoundPage";
import PostsPage from "../../pages/PostsPage";
import ProfilePage from "../../pages/ProfilePage";

const Main: React.FC = () => {
  return (
    <Routes>
      <Route index path="/" element={<PostsPage />} />
      <Route path="/:postId/comments" element={<CommentsPage />} />
      <Route path="/profile/:userId" element={<ProfilePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default Main;
