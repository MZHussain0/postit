"use client";
import Image from "next/image";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axios from "axios";
import Toggle from "./Toggle";

type EditProps = {
  avatar: string;
  name: string;
  title: string;
  id: string;
  comments?: {
    id: string;
    userId: string;
    postId: string;
  }[];
};

export default function EditPost({
  avatar,
  name,
  title,
  comments,
  id,
}: EditProps) {
  const [toggle, setToggle] = useState(false);
  const queryClient = useQueryClient();
  let deletePostId: string;

  // delete the post
  const { mutate } = useMutation(
    async (id: string) =>
      await axios.delete("api/posts/deletePost", { data: id }),
    {
      onError: (error) => {
        toast.error("error deleting post", { id: deletePostId });
        console.log(error);
      },
      onSuccess: () => {
        toast.success("Post has been deleted", { id: deletePostId });
        queryClient.invalidateQueries(["auth-posts"]);
      },
    }
  );

  const deletePost = () => {
    mutate(id);
  };
  return (
    <>
      <div className="bg-white my-8 p-8 rounded-lg">
        <div className="flex items-center gap-2">
          <Image
            width={32}
            height={32}
            src={avatar}
            alt="avatar"
            className="rounded-full"></Image>
          <h3 className="font-bold text-gray-700">{name}</h3>
        </div>
        <div className="my-8">
          <p className="break-all">{title}</p>
        </div>
        <div className="flex items-center gap-4">
          <p className="text-sm font-bold text-gray-700">
            {comments?.length} comments
          </p>
          <button
            onClick={() => setToggle(!toggle)}
            className="bg-red-600 px-6 py-2 rounded-lg text-white font-bold text-sm">
            DELETE
          </button>
        </div>
      </div>
      {toggle && <Toggle deletePost={deletePost} setToggle={setToggle} />}
    </>
  );
}
