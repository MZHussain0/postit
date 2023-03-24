"use client";
import AddComment from "@/app/components/AddComment";
import Post from "@/app/components/Post";
import { PostType } from "@/app/types/Posts";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";

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
      {data?.comments?.map((comment) => (
        <div key={comment.id} className="my-6 bg-white p-8 rounded-md">
          <div className="flex items-center gap-2">
            <Image
              width={24}
              height={24}
              src={comment?.user?.image}
              alt="avatar"
            />
            <h3 className="font-bold">{comment?.user?.name}</h3>
            <h2 className="text-sm">{comment?.createdAt}</h2>
          </div>
          <div className="py-2"> {comment.message}</div>
        </div>
      ))}
    </div>
  );
}
