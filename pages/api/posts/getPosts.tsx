import type { NextApiRequest, NextApiResponse } from "next";
import client from "@/prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    // fetch all posts
    try {
      const result = await client.post.findMany({
        include: { user: true },
        orderBy: { createdAt: "desc" },
      });
      res.status(200).json(result);
    } catch (error) {
      res.status(403).json({ error: "error occured during fetching Posts" });
    }
  }
}
