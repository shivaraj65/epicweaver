import { useState } from "react";
import styles from "./explore.module.css";

const Explore = () => {
  const submitGen1 = async () => {
    const prompt = "write a story about a school boy who was a genius in maths";
    const previousStory =
      "Once upon a time, there was a boy named Billy who loved to read. He would spend hours in the library, reading everything he could get his hands on. One day, Billy was browsing the library shelves when he came across a strange book. It was old and dusty, and the title was embossed in gold on the cover: The Book of Secrets.";
    let body = {
      model:"PALM",
      temperature: 1, 
      userid: localStorage.getItem('credId'),
      prompt:prompt,
      templateStyle:"startNew",
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

  const submitGen2 = async () => {
    const prompt = "continue the story";
    const previousStory =
      "Once upon a time, there was a boy named Billy who loved to read. He would spend hours in the library, reading everything he could get his hands on. One day, Billy was browsing the library shelves when he came across a strange book. It was old and dusty, and the title was embossed in gold on the cover: The Book of Secrets.";
    let body = {
      model:"PALM",
      temperature: 1, 
      userid: localStorage.getItem('credId'),
      prompt:prompt,
      templateStyle:"continueExisting",
      previousStory:previousStory
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

  const getAllStories =async()=>{
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
  }

  const getStoriesByUserId =async()=>{
    const requestOptions: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": " application/json; charset=utf-8",
      },
      body: JSON.stringify({userId:localStorage.getItem('credId')}),
    };
    const response = await fetch("/api/getAllStoriesByUser", requestOptions);
    const resWithoutStreaming = await new Response(response.body).text();
    // const result = await JSON.parse(resWithoutStreaming);
    console.log(resWithoutStreaming);
  }

  const getStoryContext = async()=>{
    let body = {
      storyId:"190jie293STORY_ID",
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
  }

  return (
    <div>
      <p>explore</p>
      <button
        onClick={() => {
          submitGen1();
        }}
      >
        story generate 
      </button>
      <hr style={{margin:"5px 30%", border:"none"}}/>
      <button
        onClick={() => {
          submitGen2()
        }}
      >
        story continue 
      </button>
      <hr style={{margin:"5px 30%", border:"none"}}/>
      <button
        onClick={() => {
          getAllStories()
        }}
      >
        fetch all stories
      </button>
      <hr style={{margin:"5px 30%", border:"none"}}/>
      <button
        onClick={() => {
          getStoriesByUserId()
        }}
      >
        fetch all stories by user
      </button>
      <hr style={{margin:"5px 30%", border:"none"}}/>
      <button
        onClick={() => {
          getStoryContext()
        }}
      >
        get context of a story -test again
      </button>

        <p>---- create data to DB api ----</p>
        <p>create story</p>
        <p>create story node</p>

        <p>---- update data to DB api ----</p>
        <p>update story</p>
        <p>update story node</p>
        <p>update user</p>

        <p>---- delete data to DB api ----</p>
        <p>delete story</p>
        <p>delete story node</p>
    </div>
  );
};

export default Explore;
