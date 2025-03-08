export interface RequestUser {
  email: string;
  password: string;
}

export interface User {
  id: number;
  email: string;
  password_hash: string;
  created_at: string;
  updated_at: string;
}
