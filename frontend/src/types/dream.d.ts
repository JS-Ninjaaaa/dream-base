export interface RequestDream {
  content: string;
  is_public: boolean;
  hashtags: string[];
}

export interface Dream {
  id: number;
  user_id: string;
  content: string;
  is_public: boolean;
  likes: number;
  created_at: string;
  updated_at: string;
  hashtags: Hashtag[];
}

interface Hashtag {
  id: number; 
  name: string;
}
