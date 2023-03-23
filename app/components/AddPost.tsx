"use client";
import React, { useState } from "react";

type Props = {};

const CreatePost = (props: Props) => {
  const [title, setTitle] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  return (
    <form className="bg-white my-8 p-8 rounded-md">
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
          disabled={isDisabled}
          className=" bg-teal-600 text-white py-2 px-4 rounded-xl text-l font-bold disabled:opacity-25 cursor-pointer "
          type="submit">
          Post It!
        </button>
      </div>
    </form>
  );
};

export default CreatePost;
