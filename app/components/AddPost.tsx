"use client";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

type Props = {};

const CreatePost = (props: Props) => {
  const [title, setTitle] = useState("");
  const queryClient = useQueryClient();
  let toastPostID: string;

  setTimeout(() => {
    toast.dismiss(toastPostID);
  }, 8000);

  const { mutate } = useMutation(
    async (title: string) => await axios.post("/api/posts/addPost", { title }),
    {
      onError: (error) => {
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data.message, { id: toastPostID });
        }
      },
      onSuccess: () => {
        toast.success("Post has been made 🔥", { id: toastPostID });
        queryClient.invalidateQueries(["posts"]);
        setTitle("");
      },
    }
  );

  const submitPost = async (e: React.FormEvent) => {
    e.preventDefault();
    toastPostID = toast.loading("creating your post...", { id: toastPostID });
    mutate(title);
    setTitle("");
  };

  return (
    <form onSubmit={submitPost} className="bg-white my-8 p-8 rounded-md">
      <div className="flex flex-col my-4">
        <textarea
          onChange={(e) => setTitle(e.target.value)}
          name="title"
          value={title}
          placeholder="What's on your mind?"
          className="p-4 text-xl rounded-md my-2 bg-gray-200"></textarea>
      </div>
      <div className="flex items-center justify-between gap-2">
        <p
          className={`font-bold text-sm ${
            title.length > 300 ? "text-red-700" : "text-gray-700"
          }`}>
          {`${title.length}/300`}
        </p>
        <button
          disabled={title.length > 0 ? false : true}
          className=" bg-teal-600 text-white py-2 px-4 rounded-xl text-l font-bold disabled:opacity-25 cursor-pointer "
          type="submit">
          Post It!
        </button>
      </div>
    </form>
  );
};

export default CreatePost;
