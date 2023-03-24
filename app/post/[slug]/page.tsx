"use client";
import AddComment from "@/app/components/AddComment";
import Post from "@/app/components/Post";
import { PostType } from "@/app/types/Posts";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type URL = {
  params: {
    slug: string;
  };
};

const fetchPostDetails = async (slug: string) => {
  const response = await axios.get(`/api/posts/${slug}`);
  return response.data;
};

export default function PostDetails(url: URL) {
  const { data, isLoading } = useQuery({
    queryFn: () => fetchPostDetails(url.params.slug),
    queryKey: ["details-posts"],
  });

  if (isLoading) return "Loading...";
  console.log(data);
  return (
    <div>
      <Post
        id={data?.id}
        name={data?.user.name}
        avatar={data?.user.image}
        postTitle={data?.title}
        comments={data?.commments}
      />
      <AddComment id={data?.id} />
    </div>
  );
}
