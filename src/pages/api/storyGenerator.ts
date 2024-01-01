//@ts-nocheck
import type { NextApiRequest, NextApiResponse } from "next";
// import { PrismaClient } from "@prisma/client";
import { GooglePaLM } from "langchain/llms/googlepalm";
// import { JsonOutputParser } from "langchain/output_parsers/json_output_parser";
// import { JsonOutputFunctionsParser } from "langchain/output_parsers";
// import { StructuredOutputParser } from "langchain/output_parsers";
// import { RunnableSequence } from "langchain/schema/runnable";
// import { PromptTemplate } from "langchain/prompts";

type Data = {
  title: any;
  story: any;
  status: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const model = new GooglePaLM({
      apiKey: "AIzaSyBAhPtn99TY-Xb-azZmo0rmJv-9Bs_5wk8",
      temperature: 1,
      modelName: "models/text-bison-001",
      maxOutputTokens: 1024,
      // topK: 40,
      // topP: 1,
      safetySettings: [
        {
          category: "HARM_CATEGORY_DANGEROUS",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
      ],
    });

    const promptTemplates = {
      startNew: `Write a paragraph of a story that leaves room for more:
      
        {{prompt}}
      
        (Do not try to finish the story. Leave it open for continuation.)`,

      continueExisting: `Continue the following story with a paragraph that leaves room for more, and create a 2-4 word title summarizing the new content, start with the title in first line and continue the story in the second line:
      
        {{previousStory}}
      
        {{prompt}}
      
        (Do not try to finish the story. Leave it open for continuation.)`,
    };

    // const parser = new JsonOutputFunctionsParser({
    //   parse: async (output) => {
    //     // Split the output into potential title and story parts:
    //     const parts = output.split("\n");

    //     const title = parts.length > 1 ? parts[0].trim() : undefined; // Extract title if available
    //     const story = parts.slice(1).join("\n").trim(); // Extract remaining text as story

    //     return { title, story };
    //   },
    // });

    const title = "magic book";
    const prompt = "continue the story";
    const previousStory =
      "Once upon a time, there was a boy named Billy who loved to read. He would spend hours in the library, reading everything he could get his hands on. One day, Billy was browsing the library shelves when he came across a strange book. It was old and dusty, and the title was embossed in gold on the cover: The Book of Secrets.";

    const promptTemplate = promptTemplates["continueExisting"];
    const filledPrompt = promptTemplate
      .replace("{{prompt}}", prompt)
      .replace("{{previousStory}}", previousStory || "");

    const resu = await model.call(filledPrompt);
    // console.log({ res });

    const parts = resu.split("\n");
    const title1 = "" + parts[0].trim();
    // console.log("title :-", title1);
    let story1 = "";
    for (let i = 1; i < parts.length; i++) {
      story1 = story1 + " " + parts[i];
    }

    // console.log(typeof title1);
    // console.log(typeof story1);

    res.status(200).json({ title: title1, story: story1, status: "success" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ title: null, story: null, status: "error" });
  }
}
