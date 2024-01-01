import { useState } from "react";
import styles from "./explore.module.css";

const Explore = () => {
  const submit = async () => {
    let body = {};
    const requestOptions: RequestInit = {
      method: "GET",
      headers: {
        "Content-Type": " application/json; charset=utf-8",
      },
      // body: JSON.stringify(body),
    };

    const response = await fetch("/api/storyGenerator", requestOptions);
    const resWithoutStreaming = await new Response(response.body).text();
    // const result = await JSON.parse(resWithoutStreaming);
    console.log(resWithoutStreaming);
  };
  return (
    <div>
      <p>explore</p>
      <button
        onClick={() => {
          submit();
        }}
      >
        click
      </button>
    </div>
  );
};

export default Explore;
