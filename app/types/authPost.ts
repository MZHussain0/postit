export type authPost = {
  email: string;
  id: string;
  name: string;
  image: string;
  posts: {
    id: string;
    title: string;
    createdAt: string;
    comments?: {
      createdAt: string;
      id: string;
      postId: string;
      title: string;
      userId: string;
    }[];
  }[];
};
