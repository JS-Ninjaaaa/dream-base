export interface RequestDream {
  user_id?: string;
  title: string;
  content: string;
  is_public: boolean;
}

export interface Dream {
  id: number;
  user_id: string;
  title: string;
  content: string;
  is_public: boolean;
  likes: number;
  created_at: string;
  updated_at: string;
}
