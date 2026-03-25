export interface User {
  id: string;
  name: string;
  avatar: string;
  createdAt: string;
}

export interface Company {
  id: string;
  name: string;
  features?: string[];
  users?: string[];
}

export interface ErrorResponse {
  error: string;
}
