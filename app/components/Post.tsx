"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  name: string;
  postTitle: string;
  avatar: string;
  id: string;
  comments: [];
};

const Post = ({ name, postTitle, avatar, id, comments }: Props) => {
  return (
    <div className="my-8 p-8 rounded-lg bg-white">
      <div className="flex items-center gap-2">
        <Image
          className="rounded-full"
          width={32}
          height={32}
          src={avatar}
          alt="avatar"
        />
        <h3 className="font-bold text-gray-700">{name}</h3>
      </div>
      <div className="my-8">
        <p className="break-all">{postTitle}</p>
      </div>
      <div className="flex items-center cursor-pointer gap-4">
        <Link href={`/post/${id}`}>
          <p className="text-sm font-bold text-gray-700">
            {comments?.length} &nbsp; comments
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Post;
