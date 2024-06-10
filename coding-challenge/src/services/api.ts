import axios from "axios";
import { Comment } from "../types";

const API = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export const fetchPosts = (page: number, limit: number, userId?: number) => {
  return API.get(
    "/posts",
    userId
      ? {
          params: {
            _page: page,
            _limit: limit,
            userId: userId,
          },
        }
      : {
          params: {
            _page: page,
            _limit: limit,
          },
        }
  );
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
