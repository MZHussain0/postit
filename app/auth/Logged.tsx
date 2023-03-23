"use client";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";

type User = {
  image: string;
};

const Logged = ({ image }: User) => {
  return (
    <li className="flex gap-8 items-center">
      <button
        onClick={(e) => {
          e.preventDefault();
          signOut();
        }}
        className="text-sm bg-gray-700 px-6 py-2 rounded-xl text-white">
        Sign Out
      </button>
      <Link href={"/dashboard"}>
        <Image
          className="w-10 rounded-full"
          width={48}
          height={48}
          alt="profile pic"
          src={image}
          priority
        />
      </Link>
    </li>
  );
};

export default Logged;
