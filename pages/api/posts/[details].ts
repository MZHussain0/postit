import type { NextApiRequest, NextApiResponse } from "next";
import client from "@/prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    // GET oarticular post details

    try {
      const result = await client.post.findUnique({
        where: { id: req.query.details },
        include: {
          user: true,
          comments: {
            orderBy: {
              createdAt: "desc",
            },
            include: {
              user: true,
            },
          },
        },
      });
      return res.status(200).json(result);
    } catch (error) {
      res
        .status(403)
        .json({ error: "error occured whilst fetching post details" });
    }
  }
}
