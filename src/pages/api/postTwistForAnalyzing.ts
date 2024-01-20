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
  if (req.method === "POST") {
    try {
      let user = await prisma.user.findMany({
        where: {
          id : req.body?.id,
        },
      });
      prisma.$disconnect();
      //call the thirdparty api here... modify the api data..
      const apiData =
        {
            hashId: req.body.hashId
          }

      const requestOptions: RequestInit = {
        method: "POST",
        headers: {
          "Content-Type": " application/json",
          "x-auth-token": ""+user[0].story3ApiKey
        },
        body: JSON.stringify(apiData),
      };
      const response = await fetch(`https://story3.com/api/v2/twists/${req.body.hashId}/publish`, requestOptions);
      const resWithoutStreaming = await new Response(response.body).text();
      const result = await JSON.parse(resWithoutStreaming);
      // console.log("streaming",result);
      res.status(200).json({ data: result, status: "success" });
    } catch (err) {
      console.log(err);
      res.status(501).json({ data: null, status: "error" });
    }
  } else {
    res.status(500).json({ data: null, status: "error" });
  }
}
