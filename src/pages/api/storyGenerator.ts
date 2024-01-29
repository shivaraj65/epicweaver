//@ts-nocheck
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { GooglePaLM } from "langchain/llms/googlepalm";
import { PromptTemplate } from "@langchain/core/prompts";
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
} from "langchain/prompts";
import { LLMChain } from "langchain/chains";
import { OpenAI } from "@langchain/openai";

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
          : req.body?.model === "GPT 3.5"
          ? user[0]?.gpt35Key
          : req.body?.model === "GPT 4"
          ? user[0]?.gpt4Key
          : null;
      if (!key) {
        res.status(204).json({ title: null, story: null, status: "KEY_ERROR" });
      }
      // console.log("key--", key);
      let model:any
      if(req.body?.model === "PALM"){
        model = new GooglePaLM({
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
  
      }else if (req.body?.model === "GPT 3.5"){
        model = new OpenAI({
          modelName: "gpt-3.5-turbo-instruct", 
          temperature: 0.9,
          openAIApiKey: key, 
        });
      }else if(req.body?.model === "GPT 4"){
        const model = new OpenAI({
          modelName: "gpt-4", 
          temperature: 0.9,
          openAIApiKey: "YOUR-API-KEY", 
        });
      }
      
      const gpt35Model = ""

      const gpt4Model = ""

      const promptTemplates = {
        startNew:
         `Elaborate the given prompt as a short paragraph with some lines. Donot finish the story keep it open ended:
          =========
          prompt: {{prompt}}
          =========
          (Do not try to finish the story. Leave it open for continuation.***your response should be only 5 to 8 sentences.***)`,

        continueExisting:
          `Elaborate and continue the given prompt as a short paragraph with a title for the section based on the story. ***give a title in the first line and continue the story from the second line***.
          =======
         story: {previousStory}
          =======
         prompt: {prompt}
          =======
          (Finish the story only if explicitly asked to in the prompt. Otherwise, leave it open for continuation.***your response should be only 5 to 8 sentences.***)`,
      };

      // const promptAdvanceTemplates = {
      //   startNew: ChatPromptTemplate([
      //     SystemMessagePromptTemplate.fromTemplate(
      //       `
      //       you are a story writing bot, you will provide a starting piece of story in a short paragraph with 5 to 8 lines.
      //       -donot try to finish the story. keep it open ended for continuation.
      //       -you are supposed to elaborate the given user prompt as a story.
      //       `
      //     ),
      //     HumanMessagePromptTemplate("{input}"),
      //   ]),
      //   continueExisting: ChatPromptTemplate([
      //     SystemMessagePromptTemplate.fromTemplate(
      //       `
      //       you are a story writing bot, you will provide the continuation of the story {previousStory} in a short paragraph with 5 to 8 lines.
      //       -donot try to finish the story. keep it open ended for continuation.
      //       -you are supposed to elaborate the given user prompt as a story.
      //       -give a title for the pargagraph in the first line and continue the story from the second line.
      //       - if the user asks you to continue the story them feel free to create yout own plots and twists.
      //       -if the user asks to end the story, then do the same.
      //       `
      //     ),
      //     HumanMessagePromptTemplate("{input}"),
      //   ]),
      // };

      const promptTemplate = promptTemplates[req.body?.templateStyle];
      // const llm = new LLMChain({ llm: new OpenAI(), promptTemplate });
      // const result = await llm.call(
      //   (input = req.body?.prompt),
      //   (previousStory = req.body?.previousStory)
      // );
      // console.log(result);

      // res.status(500).json({ title: null, story: null, status: "error" });

      if (req.body?.templateStyle === "startNew") {
        let filledPrompt = promptTemplate.replace(
          "{prompt}",
          req.body?.prompt
        );
        // let filledPrompt = await promptTemplate.format({
        //   prompt: req.body?.prompt,
        // });
        console.log("filled prompt----",filledPrompt)
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
          .replace("{prompt}", req.body?.prompt)
          .replace("{previousStory}", req.body?.previousStory || "");

        // let filledPrompt = await promptTemplate.format({
        //   prompt: req.body?.prompt,
        //   previousStory: req.body?.previousStory,
        // });
        
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
