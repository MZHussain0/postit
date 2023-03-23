"use client";
import Image from "next/image";
import { useState } from "react";

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
  return (
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
        <button className="bg-red-600 px-6 py-2 rounded-lg text-white font-bold text-sm">
          DELETE
        </button>
      </div>
    </div>
  );
}
