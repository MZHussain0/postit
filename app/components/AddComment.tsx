import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

type comment = {
  postId?: string;
  title: string;
};

const AddComment = ({ id }: any) => {
  const [title, setTitle] = useState("");
  let toastCommentId: string;
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    async (data: comment) => axios.post("/api/posts/addComment", { data }),
    {
      onError: (error) => {
        toast.error("comment was not added", { id: toastCommentId });
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries(["details-posts"]);
        setTitle("");
        toast.success("added your comment", { id: toastCommentId });
      },
    }
  );

  const submitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ title, postId: id });
  };
  return (
    <form className="my-8" onSubmit={submitComment}>
      <h3>Add a comment</h3>
      <div className="flex flex-col my-2">
        <input
          type="text"
          className="p-4 text-l rounded-lg my-2 bg-white"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
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
          comment
        </button>
      </div>
    </form>
  );
};

export default AddComment;
