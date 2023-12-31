//@ts-nocheck
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
    // console.log(req.body);
    let res1 = await prisma.story.create({
      data: {
        id: uuidv4(),
        title: req.body?.title,
        model: req.body?.model,
        temperature: req.body?.temperature,
        userId: req.body?.userId,
        createdAt: new Date().toISOString(),
        publishedStatus: req.body?.publishedStatus,
      },
    });
    prisma.$disconnect();
    console.log(res1);
    if(res1){
        res.status(200).json({ data: res1, status: "success" });
    }else{
        res.status(204).json({ data: null, status: "failed" });
    }
    
  } catch (err) {
    // console.log(err);
    res.status(500).json({ data: null, status: "failed" });
  }
}
