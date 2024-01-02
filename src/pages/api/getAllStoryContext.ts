//@ts-nocheck
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { sha512 } from "js-sha512";

type Data = {
  data: any;
  status: any;
};

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    try {
      let result = await prisma.context.findMany({
        where: {
            storyId: req.body?.storyId,
          },
          orderBy: {
            createdAt : "asc",
          },
      });
      prisma.$disconnect();
    //   console.log(result)
      res.status(200).json({ data: result, status: "success" });
    } catch (err) {
      console.log(err);
      res.status(501).json({ data: null, status: "error" });
    }
  } else {
    res.status(500).json({ data: null, status: "error" });
  }
}
