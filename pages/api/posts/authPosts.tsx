import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import client from "@/prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const session = await getServerSession(req, res, authOptions);

    // GET auth user posts

    // create post
    try {
      const result = await client.user.findUnique({
        where: { email: session?.user?.email },
        include: {
          posts: {
            orderBy: {
              createdAt: "desc",
            },
            include: {
              comments: true,
            },
          },
        },
      });
      res.status(200).json(result);
    } catch (error) {
      res.status(403).json({ error: "error occured during post creation" });
    }
  }
}
