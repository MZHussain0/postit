"use client";
import { signIn } from "next-auth/react";

export default function Login() {
  return (
    <li className="list-none">
      <button
        className="text-sm bg-gray-700 px-6 py-2 rounded-xl text-white"
        onClick={(e) => {
          e.preventDefault();
          signIn();
        }}>
        Sign In
      </button>
    </li>
  );
}
