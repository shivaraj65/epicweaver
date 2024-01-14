//@ts-nocheck
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { GooglePaLM } from "langchain/llms/googlepalm";

type Data = {
  title: any;
  story: any;
  status: any;
};
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    // console.log(req.body);
    if (req.method === "POST") {
      //input data
      //model, temperature, userid, prompt, templateStyle, previousStory

      //fetch userDetails...
      let user = await prisma.user.findMany({
        where: {
          id: req.body?.userid,
        },
      });
      prisma.$disconnect();
      // console.log(user);
      let key =
        req.body?.model === "PALM"
          ? user[0]?.palmApiKey
          : req.body?.model === "GPT35"
          ? user[0]?.gpt35Key
          : req.body?.model === "GPT4"
          ? user[0]?.gpt4Key
          : null;
      if (!key) {
        res.status(204).json({ title: null, story: null, status: "KEY_ERROR" });
      }
      // console.log("key--", key);
      const model = new GooglePaLM({
        apiKey: key,
        temperature: req.body?.temperature,
        modelName: "models/text-bison-001",
        // maxOutputTokens: 1024,
        // topK: 40,
        // topP: 1,
        // safetySettings: [
        //   {
        //     category: "HARM_CATEGORY_DANGEROUS",
        //     threshold: "BLOCK_MEDIUM_AND_ABOVE",
        //   },
        // ],
      });

      const promptTemplates = {
        startNew: `Elaborate the given prompt as a short paragraph with some lines. Donot finish the story keep it open ended:
        
          prompt: {{prompt}}
        
          (Do not try to finish the story. Leave it open for continuation.response should not exceed 800 characters.)`,

        continueExisting: `Elaborate and continue the given prompt as a short paragraph with some lines based on the story. ***give a title in the first line and continue the story from the second line***.
       
         story: {{previousStory}}
        
         prompt: {{prompt}}
        
          (Finish the story only if explicitly asked to in the prompt. Otherwise, leave it open for continuation. response should not exceed 800 characters.)`,
      };

      const promptTemplate = promptTemplates[req.body?.templateStyle];
      if (req.body?.templateStyle === "startNew") {
        let filledPrompt = promptTemplate.replace(
          "{{prompt}}",
          req.body?.prompt
        );
        const result = await model.call(filledPrompt);
        console.log(result);
        //parser logic...
        const parts = result.split("\n");
        // const title = "" + parts[0].trim();
        let story = "";
        for (let i = 0; i < parts.length; i++) {
          story = story + " " + parts[i];
        }
        res.status(200).json({ title: null, story: story, status: "success" });
      } else {
        let filledPrompt = promptTemplate
          .replace("{{prompt}}", req.body?.prompt)
          .replace("{{previousStory}}", req.body?.previousStory || "");
        const result = await model.call(filledPrompt);
        console.log(result);
        //parser logic...
        const parts = result.split("\n");
        const title = "" + parts[0].trim();
        let story = "";
        for (let i = 1; i < parts.length; i++) {
          story = story + " " + parts[i];
        }
        res.status(200).json({ title: title, story: story, status: "success" });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ title: null, story: null, status: "error" });
  }
}
