import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

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
    console.log(req.body);
    let res1 = await prisma.user.findMany({
      where: {
        email: req.body?.email,
      },
      orderBy: {
        name: "desc",
      },
    });
    prisma.$disconnect();
    console.log(res1)
    if (
      res1[0].email === req.body.email &&
      res1[0].password === req.body.password
    ) {
      res.status(200).json({ data: res1, status: "success" });
    } else {
      res.status(200).json({ data: null, status: "failed" });
    }

    // console.log(res1);
  } catch (err) {
    console.log(err);
  }
}
