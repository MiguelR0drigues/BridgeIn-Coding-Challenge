import axios from "axios";
import { Comment } from "../types";

const API = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export const fetchPosts = (page: number, limit: number, userId?: number) => {
  const params: { _page: number; _limit: number; userId?: number } = {
    _page: page,
    _limit: limit,
  };
  if (userId) {
    params.userId = userId;
  }
  return API.get("/posts", { params });
};

export const fetchComments = (postId: number, page: number, limit: number) => {
  return API.get<Comment[]>(`/posts/${postId}/comments`, {
    params: {
      _page: page,
      _limit: limit,
    },
  });
};

export const fetchUsers = () => {
  return API.get("/users");
};
export default API;
