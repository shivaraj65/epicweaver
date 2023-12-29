import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import { sha512 } from 'js-sha512';

type Data = {
  data: any;
};

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    console.log(req.body);
    let res1 = await prisma.user.create({
      data: {
        id: uuidv4(),
        name: req.body?.name,
        email: req.body?.email,
        password: sha512(req.body?.password),
      },
    });
    prisma.$disconnect();
    // console.log(res1);
    res.status(200).json({ data: res1 });
  } catch (err) {
    console.log(err);
  }

}
