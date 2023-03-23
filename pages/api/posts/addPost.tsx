import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import client from "@/prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);
    if (!session)
      return res.status(401).json({ message: "Please signin to make a post" });

    const title: string = req.body.title;

    // GET user
    const prismaUser = await client.user.findUnique({
      where: { email: session?.user?.email },
    });

    //Check title
    if (title.length > 300) {
      return res.status(403).json({ message: "word limit exceeded" });
    }

    if (!title.length) {
      return res
        .status(403)
        .json({ message: "Please write something before we can post it." });
    }

    // create post
    try {
      const result = await client.post.create({
        data: { title, userId: prismaUser.id },
      });
      res.status(200).json(result);
    } catch (error) {
      res.status(403).json({ error: "error occured during post creation" });
    }
  }
}
