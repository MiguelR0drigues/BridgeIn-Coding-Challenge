export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  color?: string;
}