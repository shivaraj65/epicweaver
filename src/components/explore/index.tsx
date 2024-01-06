import { useState } from "react";
import styles from "./explore.module.css";

const Explore = () => {
  //done
  const submitGen1 = async () => {
    const prompt = "write a story about a school boy who was a genius in maths";
    const previousStory =
      "Once upon a time, there was a boy named Billy who loved to read. He would spend hours in the library, reading everything he could get his hands on. One day, Billy was browsing the library shelves when he came across a strange book. It was old and dusty, and the title was embossed in gold on the cover: The Book of Secrets.";
    let body = {
      model: "PALM",
      temperature: 1,
      userid: localStorage.getItem("credId"),
      prompt: prompt,
      templateStyle: "startNew",
      // previousStory:previousStory
    };
    const requestOptions: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": " application/json; charset=utf-8",
      },
      body: JSON.stringify(body),
    };

    const response = await fetch("/api/storyGenerator", requestOptions);
    const resWithoutStreaming = await new Response(response.body).text();
    // const result = await JSON.parse(resWithoutStreaming);
    console.log(resWithoutStreaming);
  };

  //done
  const submitGen2 = async () => {
    const prompt = "continue the story";
    const previousStory =
      "Once upon a time, there was a boy named Billy who loved to read. He would spend hours in the library, reading everything he could get his hands on. One day, Billy was browsing the library shelves when he came across a strange book. It was old and dusty, and the title was embossed in gold on the cover: The Book of Secrets.";
    let body = {
      model: "PALM",
      temperature: 1,
      userid: localStorage.getItem("credId"),
      prompt: prompt,
      templateStyle: "continueExisting",
      previousStory: previousStory,
    };
    const requestOptions: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": " application/json; charset=utf-8",
      },
      body: JSON.stringify(body),
    };

    const response = await fetch("/api/storyGenerator", requestOptions);
    const resWithoutStreaming = await new Response(response.body).text();
    // const result = await JSON.parse(resWithoutStreaming);
    console.log(resWithoutStreaming);
  };

  const getAllStories = async () => {
    const requestOptions: RequestInit = {
      method: "GET",
      headers: {
        "Content-Type": " application/json; charset=utf-8",
      },
    };
    const response = await fetch("/api/getAllStories", requestOptions);
    const resWithoutStreaming = await new Response(response.body).text();
    // const result = await JSON.parse(resWithoutStreaming);
    console.log(resWithoutStreaming);
  };

  //done
  const getStoriesByUserId = async () => {
    const requestOptions: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": " application/json; charset=utf-8",
      },
      body: JSON.stringify({ userId: localStorage.getItem("credId") }),
    };
    const response = await fetch("/api/getAllStoriesByUser", requestOptions);
    const resWithoutStreaming = await new Response(response.body).text();
    // const result = await JSON.parse(resWithoutStreaming);
    console.log(resWithoutStreaming);
  };

  //done
  const getStoryContext = async () => {
    let body = {
      storyId: "190jie293STORY_ID",
    };
    const requestOptions: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": " application/json; charset=utf-8",
      },
      body: JSON.stringify(body),
    };
    const response = await fetch("/api/getAllStoryContext", requestOptions);
    const resWithoutStreaming = await new Response(response.body).text();
    // const result = await JSON.parse(resWithoutStreaming);
    console.log(resWithoutStreaming);
  };


  //create-------

  //done
  const createStory = async () => {
    let body = {
      title: "test title 02",
      model: "PALM",
      temperature: "1",
      userId: localStorage.getItem("credId"),
      publishedStatus: "false",
    };
    const requestOptions: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": " application/json; charset=utf-8",
      },
      body: JSON.stringify(body),
    };
    const response = await fetch("/api/createStory", requestOptions);
    const resWithoutStreaming = await new Response(response.body).text();
    // const result = await JSON.parse(resWithoutStreaming);
    console.log(resWithoutStreaming);
  };

  //done
  const createNode = async () => {
    let body = {
      storyId: "8c469eee-163f-470d-befa-61fef3eae15d",
      context: "test context afhwioehwehifoiwehfkwenfwioejfiowjefifewoiehf",
      title: "test title 101",
      previousNodeId: "null",
      userId: localStorage.getItem("credId"),
      publishedStatus: "false",
      prompt: "create story for test title 101",
    };
    const requestOptions: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": " application/json; charset=utf-8",
      },
      body: JSON.stringify(body),
    };
    const response = await fetch("/api/createNode", requestOptions);
    const resWithoutStreaming = await new Response(response.body).text();
    // const result = await JSON.parse(resWithoutStreaming);
    console.log(resWithoutStreaming);
  };


  
  const updateStory = async () => {
    let body = {
      id: "b7a88beb-2021-4f89-9d21-1d3e6cb60ad3",
      title: "test title 02 -updated",
      model: "PALM",
      temperature: "0.5",
      publishedStatus: "false",
    };
    const requestOptions: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": " application/json; charset=utf-8",
      },
      body: JSON.stringify(body),
    };
    const response = await fetch("/api/updateStory", requestOptions);
    const resWithoutStreaming = await new Response(response.body).text();
    // const result = await JSON.parse(resWithoutStreaming);
    console.log(resWithoutStreaming);
  };

  const updateNode = async () => {
    let body = {
      id: "8933e0fb-0207-427f-9a5b-cdbca23770a6",
      context:
        "test context afhwioehwehifoiwehfkwenfwioejfiowjefifewoiehf -updated",
      title: "test title 101 -udpated",
      publishedStatus: "false",
      prompt: "create story for test title 101 -updated",
    };
    const requestOptions: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": " application/json; charset=utf-8",
      },
      body: JSON.stringify(body),
    };
    const response = await fetch("/api/updateNode", requestOptions);
    const resWithoutStreaming = await new Response(response.body).text();
    // const result = await JSON.parse(resWithoutStreaming);
    console.log(resWithoutStreaming);
  };

  const updateUser = async () => {
    //not for password update... only for user name and keys update
    let body = {
      id: localStorage.getItem("credId"),
      name: "shivaraj1",
      story3ApiKey:
        "",
      palmApiKey: "",
      gpt35Key: "test update",
      gpt4Key: "test update",
    };
    const requestOptions: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": " application/json; charset=utf-8",
      },
      body: JSON.stringify(body),
    };
    const response = await fetch("/api/updateUser", requestOptions);
    const resWithoutStreaming = await new Response(response.body).text();
    // const result = await JSON.parse(resWithoutStreaming);
    console.log(resWithoutStreaming);
  };

  const deleteStory = async () => {
    //delete all data from context and them story
    let body = {
      id: "8c469eee-163f-470d-befa-61fef3eae15d",
    };
    const requestOptions: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": " application/json; charset=utf-8",
      },
      body: JSON.stringify(body),
    };
    const response = await fetch("/api/deleteStory", requestOptions);
    const resWithoutStreaming = await new Response(response.body).text();
    // const result = await JSON.parse(resWithoutStreaming);
    console.log(resWithoutStreaming);
  };

  return (
    <div>
      <p>explore</p>
      <button
        style={{ backgroundColor: "#C1F2B0" }}
        onClick={() => {
          submitGen1();
        }}
      >
        story generate
      </button>
      <hr style={{ margin: "5px 30%", border: "none" }} />
      <button
        style={{ backgroundColor: "#C1F2B0" }}
        onClick={() => {
          submitGen2();
        }}
      >
        story continue
      </button>
      <hr style={{ margin: "5px 30%", border: "none" }} />
      <button
        style={{ backgroundColor: "#C1F2B0" }}
        onClick={() => {
          getAllStories();
        }}
      >
        fetch all stories
      </button>
      <hr style={{ margin: "5px 30%", border: "none" }} />
      <button
        style={{ backgroundColor: "#C1F2B0" }}
        onClick={() => {
          getStoriesByUserId();
        }}
      >
        fetch all stories by user
      </button>
      <hr style={{ margin: "5px 30%", border: "none" }} />
      <button
        style={{ backgroundColor: "#C1F2B0" }}
        onClick={() => {
          getStoryContext();
        }}
      >
        get context of a story -test again
      </button>

      <p>---- create data to DB api ----</p>
      {/* //thread.. */}
      <button
        style={{ backgroundColor: "#C1F2B0" }}
        onClick={() => {
          createStory();
        }}
      >
        create story
      </button>
      <hr style={{ margin: "5px 30%", border: "none" }} />
      <button
        style={{ backgroundColor: "#C1F2B0" }}
        onClick={() => {
          createNode();
        }}
      >
        create story node
      </button>

      <p>---- update data to DB api ----</p>
      <button
        style={{ backgroundColor: "#C1F2B0" }}
        onClick={() => {
          updateStory();
        }}
      >
        update story
      </button>
      <hr style={{ margin: "5px 30%", border: "none" }} />
      <button
        style={{ backgroundColor: "#C1F2B0" }}
        onClick={() => {
          updateNode();
        }}
      >
        update story node
      </button>
      <hr style={{ margin: "5px 30%", border: "none" }} />
      <button
        style={{ backgroundColor: "#C1F2B0" }}
        onClick={() => {
          updateUser();
        }}
      >
        update user
      </button>

      <p>---- delete data to DB api ----</p>
      <button
        style={{ backgroundColor: "#FF8080" }}
        onClick={() => {
          deleteStory();
        }}
      >
        delete story
      </button>
      <hr style={{ margin: "5px 30%", border: "none" }} />
      <button onClick={() => {}}>delete story node</button> --complex logic should be acheived with the UI

      <p>---- story-3 api  ----</p>
      <button>create new story /api/v2/stories</button>
      <hr style={{ margin: "5px 30%", border: "none" }} />
      <button>patch story - complex api - need to fetch data from story3 for some story3 params</button>
      <hr style={{ margin: "5px 30%", border: "none" }} />
      <button>fetch story</button>
      <hr style={{ margin: "5px 30%", border: "none" }} />
      <button>delete story /api/v2/stories/</button>
      <hr style={{ margin: "5px 30%", border: "none" }} />
      <button>post twist /api/v2/twists/hashid</button>
      <hr style={{ margin: "5px 30%", border: "none" }} />
      <button>patch twist</button>
      <hr style={{ margin: "5px 30%", border: "none" }} />
      <button>publish twist</button>
      <hr style={{ margin: "5px 30%", border: "none" }} />
      <button>un publish twist</button>
    </div>
  );
};

export default Explore;
