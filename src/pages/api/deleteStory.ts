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
    // console.log(req.body); 
    const res1 = await prisma.context.deleteMany({
        where:{
            storyId: req.body?.id
        },
    });
    const res2 = await prisma.story.delete({
        where:{
            id: req.body?.id
        },
    });
    prisma.$disconnect();
    // console.log(res1);
    if(res1 && res2){
        res.status(200).json({ data: res1, status: "success" });
    }else{
        res.status(204).json({ data: null, status: "failed" });
    }
    
  } catch (err) {
    console.log(err);
    res.status(500).json({ data: null, status: "failed" });
  }
}
