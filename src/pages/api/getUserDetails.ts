//@ts-nocheck
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

type Data = {
  data: any;
  status: any;
};

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    let res1 = await prisma.user.findMany({
      where: {
        id: req.body?.id,
      }
    });
    prisma.$disconnect();
    // console.log(res)
    res.status(200).json({ data: res1, status: "success" });
  } catch (err) {
    // console.log(err);
    res.status(500).json({ data: null, status: "failed" });
  }
}
