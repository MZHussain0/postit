"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { authPost } from "../types/authPost";
import EditPost from "./EditPost";

const fetchAuthPost = async () => {
  const response = await axios.get("/api/posts/authPosts");
  return response.data;
};

export default function MyPost() {
  const { data, isLoading } = useQuery<authPost>({
    queryFn: fetchAuthPost,
    queryKey: ["auth-posts"],
  });

  if (isLoading) return <h1>posts are loading...</h1>;
  console.log(data);

  return (
    <div>
      {data?.posts.map((post) => (
        <EditPost
          id={post.id}
          key={post.id}
          avatar={data.image}
          name={data.name}
          title={post.title}
          comments={post.comments}
        />
      ))}
    </div>
  );
}
