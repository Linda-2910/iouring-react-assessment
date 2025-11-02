export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface PostsState {
  list: Post[];
  loading: boolean;
}

export const initialState: PostsState = {
  list: [],
  loading: false,
};
