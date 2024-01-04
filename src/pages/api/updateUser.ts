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
    let res1 = await prisma.user.update({
        where:{
            id: req.body?.id
        },
      data: {
        name: req.body?.name,
        story3ApiKey: req.body?.story3ApiKey,
        palmApiKey: req.body?.palmApiKey,
        gpt35Key: req.body?.gpt35Key,
        gpt4Key: req.body?.gpt4Key,
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
    console.log(err);
    res.status(500).json({ data: null, status: "failed" });
  }
}
