import { useState, useEffect } from "react";
import styles from "./pageTwo.module.css";
import Image from "next/image";

import { Breadcrumb, Input } from "antd";
import { SendOutlined, UserOutlined } from "@ant-design/icons";

import PALM from "@/assets/icons/PALM.svg";
import GPT from "@/assets/icons/GPT.svg";

interface Props {
  setPageFlag: Function;
}

//sample dummy data
//initial raw data.
const rawData = [
  {
    id: "1",
    context:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed scelerisque magna vel aliquet placerat. Praesent accumsan rhoncus enim, sit amet porttitor turpis convallis et. Nulla ullamcorper dapibus finibus. Nulla sit amet porta turpis, sit amet luctus leo. Aliquam nec placerat arcu. Fusce rutrum rutrum viverra. Donec eu lectus a sem venenatis aliquet. Duis fermentum lorem a dui blandit pretium. Morbi iaculis, enim vehicula dapibus porta, ligula lacus finibus lacus, eu dignissim leo dolor sed libero. Donec aliquet bibendum libero, a aliquam est. Nam varius erat eu sem sagittis, in placerat urna vulputate.",
    minifiedContext: "Lorem ipsum ",
    previousNodeId: null,
    createdAt: "some date",
    userId: 1234,
    publishedStatus: null,
    prompt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: "2",
    context:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed scelerisque magna vel aliquet placerat. Praesent accumsan rhoncus enim, sit amet porttitor turpis convallis et. Nulla ullamcorper dapibus finibus. Nulla sit amet porta turpis, sit amet luctus leo. Aliquam nec placerat arcu. Fusce rutrum rutrum viverra. Donec eu lectus a sem venenatis aliquet. Duis fermentum lorem a dui blandit pretium. Morbi iaculis, enim vehicula dapibus porta, ligula lacus finibus lacus, eu dignissim leo dolor sed libero. Donec aliquet bibendum libero, a aliquam est. Nam varius erat eu sem sagittis, in placerat urna vulputate.",
    minifiedContext: "Lorem ipsum ",
    previousNodeId: "1",
    createdAt: "2023-01-01T12:00:00Z",
    userId: 1234,
    publishedStatus: null,
    prompt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: "3",
    context:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed scelerisque magna vel aliquet placerat. Praesent accumsan rhoncus enim, sit amet porttitor turpis convallis et. Nulla ullamcorper dapibus finibus. Nulla sit amet porta turpis, sit amet luctus leo. Aliquam nec placerat arcu. Fusce rutrum rutrum viverra. Donec eu lectus a sem venenatis aliquet. Duis fermentum lorem a dui blandit pretium. Morbi iaculis, enim vehicula dapibus porta, ligula lacus finibus lacus, eu dignissim leo dolor sed libero. Donec aliquet bibendum libero, a aliquam est. Nam varius erat eu sem sagittis, in placerat urna vulputate.",
    minifiedContext: "Lorem ipsum ",
    previousNodeId: "1",
    createdAt: "2023-01-02T12:00:00Z",
    userId: 1234,
    publishedStatus: null,
    prompt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: "4",
    context:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed scelerisque magna vel aliquet placerat. Praesent accumsan rhoncus enim, sit amet porttitor turpis convallis et. Nulla ullamcorper dapibus finibus. Nulla sit amet porta turpis, sit amet luctus leo. Aliquam nec placerat arcu. Fusce rutrum rutrum viverra. Donec eu lectus a sem venenatis aliquet. Duis fermentum lorem a dui blandit pretium. Morbi iaculis, enim vehicula dapibus porta, ligula lacus finibus lacus, eu dignissim leo dolor sed libero. Donec aliquet bibendum libero, a aliquam est. Nam varius erat eu sem sagittis, in placerat urna vulputate.",
    minifiedContext: "Lorem ipsum ",
    previousNodeId: "1",
    createdAt: "2023-01-03T12:00:00Z",
    userId: 1234,
    publishedStatus: null,
    prompt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: "5",
    context:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed scelerisque magna vel aliquet placerat. Praesent accumsan rhoncus enim, sit amet porttitor turpis convallis et. Nulla ullamcorper dapibus finibus. Nulla sit amet porta turpis, sit amet luctus leo. Aliquam nec placerat arcu. Fusce rutrum rutrum viverra. Donec eu lectus a sem venenatis aliquet. Duis fermentum lorem a dui blandit pretium. Morbi iaculis, enim vehicula dapibus porta, ligula lacus finibus lacus, eu dignissim leo dolor sed libero. Donec aliquet bibendum libero, a aliquam est. Nam varius erat eu sem sagittis, in placerat urna vulputate.",
    minifiedContext: "Lorem ipsum ",
    previousNodeId: "2",
    createdAt: "2023-01-04T12:00:00Z",
    userId: 1234,
    publishedStatus: null,
    prompt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
];

//intermediate -reference data.
const intermediateData = {
  "0": [
    {
      id: "1",
      context: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      minifiedContext:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      previousNodeId: null,
      createdAt: "some date",
      userId: 1234,
      publishedStatus: null,
      prompt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
  ],
  "1": [
    {
      id: "2",
      context: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      minifiedContext:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      previousNodeId: "1",
      createdAt: "2023-01-01T12:00:00Z",
      userId: 1234,
      publishedStatus: null,
      prompt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      id: "3",
      context: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      minifiedContext:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      previousNodeId: "1",
      createdAt: "2023-01-02T12:00:00Z",
      userId: 1234,
      publishedStatus: null,
      prompt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      id: "4",
      context: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      minifiedContext:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      previousNodeId: "1",
      createdAt: "2023-01-03T12:00:00Z",
      userId: 1234,
      publishedStatus: null,
      prompt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
  ],
  "2": [
    {
      id: "5",
      context: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      minifiedContext:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      previousNodeId: "2",
      createdAt: "2023-01-04T12:00:00Z",
      userId: 1234,
      publishedStatus: null,
      prompt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
  ],
};

const PageTwo: React.FC<Props> = (props) => {
  const [input, setInput] = useState("");

  const [bronzeLayer, setBronzeLayer] = useState<any>(null);

  const [silverLayer, setSilverLayer] = useState<any>(null);

  const [goldLayer, setGoldlayer] = useState<any>(null);

  useEffect(() => {
    //initial page load data fetch...
    //storing the raw data to bronzeLayer...
    setBronzeLayer(rawData);
  }, []);

  useEffect(() => {
    (() => {
      if (bronzeLayer) {
        let refinedObject: any = {};
        let traverseList: any = [];
        //finding root...
        for (let i = 0; i < bronzeLayer.length; i++) {
          if (bronzeLayer[i].previousNodeId === null) {
            refinedObject["root"] = [bronzeLayer[i]];
            traverseList.push(bronzeLayer[i]);
            break;
          }
        }
        //process bronze layer to silver layer...
        for (let i = 0; i < traverseList.length; i++) {
          let tempArr: any = [];
          for (let j = i + 1; j < bronzeLayer.length; j++) {
            if (
              !traverseList.some((obj: any) => obj.id === bronzeLayer[j].id)
            ) {
              traverseList.push(bronzeLayer[j]);
            }
            if (bronzeLayer[j].previousNodeId === traverseList[i].id) {
              tempArr.push(bronzeLayer[j]);
            }
          }
          if (tempArr.length > 0) {
            refinedObject[traverseList[i].id] = tempArr;
          }
        }
        setSilverLayer(refinedObject);
        //initial goldLayer Load...
        if (!goldLayer) {
          let ticker = refinedObject["root"];
          let refinedArray = [];
          while (ticker) {
            refinedArray.push(ticker[0]);
            ticker = refinedObject[ticker[0].id];
          }
          setGoldlayer(refinedArray);
        }
      }
    })();
  }, [bronzeLayer]);

  const promptSubmit = () => {
    console.log("prompt submit", input);
  };

  return (
    <>
      <Breadcrumb style={{ marginBottom: "6px" }}>
        <Breadcrumb.Item
          onClick={() => {
            props.setPageFlag(0);
          }}
          className={styles.breadcrumbItem}
        >
          Workspace
        </Breadcrumb.Item>
        <Breadcrumb.Item className={styles.breadcrumbItem}>
          Create Story
        </Breadcrumb.Item>
      </Breadcrumb>
      <div className={styles.container}>
        <div className={styles.scroller}>
          <p className={styles.storyTitle}>Story Title</p>
          {goldLayer &&
            goldLayer.map((data: any, index: number) => {
              return (
                <div key={index} className={styles.chatContainer}>
                  <div className={styles.promptDiv}>
                    <p className={styles.promptText}>{data.prompt}</p>
                    <UserOutlined className={styles.userIcon} />
                  </div>

                  <div className={styles.contextDiv}>
                    <Image
                      src={PALM}
                      width={25}
                      height={25}
                      alt={"icon"}
                    ></Image>
                    <div className={styles.contextInnerDiv}>
                      {data.previousNodeId !== null ? (
                        <p className={styles.title}>
                          <span className={styles.titleTitle}>
                            Title : &nbsp;
                          </span>
                          { data.minifiedContext}
                        </p>
                      ) : null}

                      <p className={styles.storyBlock}>{data.context}</p>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>

        <div className={styles.floater}>
          <Input
            className={styles.inputFloater}
            autoFocus
            size="large"
            suffix={<SendOutlined />}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            onPressEnter={() => {
              promptSubmit();
            }}
            placeholder="Enter your prompt here"
          />
        </div>
      </div>
    </>
  );
};

export default PageTwo;
