import { useState, useEffect } from "react";
import styles from "./pageTwo.module.css";

import { Breadcrumb, Input } from "antd";
import { SendOutlined } from "@ant-design/icons";

interface Props {
  setPageFlag: Function;
}

//sample dummy data
//initial raw data.
const rawData = [
  {
    id: "1",
    context: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    minifiedContext: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    previousNodeId: null,
    createdAt: "some date",
    userId: 1234,
    publishedStatus: null,
    prompt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: "2",
    context: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    minifiedContext: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    previousNodeId: "1",
    createdAt: "2023-01-01T12:00:00Z",
    userId: 1234,
    publishedStatus: null,
    prompt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: "3",
    context: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    minifiedContext: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    previousNodeId: "1",
    createdAt: "2023-01-02T12:00:00Z",
    userId: 1234,
    publishedStatus: null,
    prompt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: "4",
    context: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    minifiedContext: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    previousNodeId: "1",
    createdAt: "2023-01-03T12:00:00Z",
    userId: 1234,
    publishedStatus: null,
    prompt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: "5",
    context: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    minifiedContext: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
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
            if(!traverseList.some((obj:any) => obj.id === bronzeLayer[j].id)){
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
        setSilverLayer(refinedObject)
        //initial goldLayer Load...
        if (!goldLayer) {
          let ticker = refinedObject['root']
          let refinedArray = [];
          while(ticker){
            refinedArray.push(ticker[0])
            ticker = refinedObject[ticker[0].id]
          }
          setGoldlayer(refinedArray)
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
