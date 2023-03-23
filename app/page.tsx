"use client";

import axios from "axios";
import CreatePost from "./components/AddPost";
import { useQuery } from "@tanstack/react-query";
import Post from "./components/Post";
import { PostType } from "./types/Posts";
// Fetch all posts
const allPosts = async () => {
  const response = await axios.get("/api/posts/getPosts");
  return response.data;
};

export default function Home() {
  const { data, error, isLoading } = useQuery<PostType[]>({
    queryFn: allPosts,
    queryKey: ["posts"],
  });
  if (error) return error;
  if (isLoading) return "Loading";
  console.log(data);
  return (
    <main>
      <CreatePost />
      {data?.map((post) => (
        <Post
          key={post.id}
          name={post.user.name}
          postTitle={post.title}
          avatar={post.user.image}
          id={post.id}
          comments={post.comments}
        />
      ))}
    </main>
  );
}
