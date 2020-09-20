export interface User {
    id: string;
    username: string;
    password: string;
    email: string;
    createdAt: string;
    updatedAt: string;
};

export interface LoginResponse {
    id: string;
    username: string;
    email: string,
    token: string;
}
  