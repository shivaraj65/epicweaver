import { useState, useEffect } from "react";
import styles from "./pageTwo.module.css";
import Image from "next/image";

import {
  Breadcrumb,
  Input,
  Skeleton,
  Popover,
  Modal,
  Progress,
  Flex,
  Button,
} from "antd";
import {
  SendOutlined,
  UserOutlined,
  LeftOutlined,
  RightOutlined,
  RedoOutlined,
  FormOutlined,
  DeleteOutlined,
  PlusOutlined,
  CloseOutlined,
  CheckOutlined,
} from "@ant-design/icons";

import userCreds from "@/store/userCreds";
import { useShallow } from "zustand/react/shallow";

import PALM from "@/assets/icons/PALM.svg";
import GPT from "@/assets/icons/GPT.svg";

interface Props {
  setPageFlag: Function;
}

const { TextArea } = Input;

//sample dummy data
//initial raw data.
const rawData = [
  {
    id: "1",
    context:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed scelerisque magna vel aliquet placerat. Praesent accumsan rhoncus enim, sit amet porttitor turpis convallis et. Nulla ullamcorper dapibus finibus. Nulla sit amet porta turpis, sit amet luctus leo. Aliquam nec placerat arcu. Fusce rutrum rutrum viverra. Donec eu lectus a sem venenatis aliquet. Duis fermentum lorem a dui blandit pretium. Morbi iaculis, enim vehicula dapibus porta, ligula lacus finibus lacus, eu dignissim leo dolor sed libero. Donec aliquet bibendum libero, a aliquam est. Nam varius erat eu sem sagittis, in placerat urna vulputate.",
    minifiedContext: "root story ",
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
    minifiedContext: "twist 1 ",
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
    minifiedContext: "twist 2 ",
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
    minifiedContext: "twist 3 ",
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
    minifiedContext: "twist 21 ",
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

  const [storyData] = userCreds(useShallow((state) => [state.storyData]));

  const [triggerIndex, setTriggerIndex] = useState<any>(-1);

  const [deleteProgress, setDeleteProgress] = useState<any>([0, 0]);

  const [loading, setLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editingMode, setEditingMode] = useState([-1, -1]);

  const [editData, setEditData] = useState<any>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      // console.log(storyData, "from page 2");
      if (storyData) {
        let body = {
          storyId: storyData.id,
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
        const result = await JSON.parse(resWithoutStreaming);
        //storing the raw data to bronzeLayer...
        setBronzeLayer(result.data);
        // console.log("bronze data", result.data);
      }
    })();
  }, []);

  useEffect(() => {
    (() => {
      setLoading(true);
      if (bronzeLayer) {
        console.log("silver layer refinement started");
        let refinedObject: any = {};
        let traverseList: any = [];
        //finding root...
        for (let i = 0; i < bronzeLayer.length; i++) {
          if (bronzeLayer[i].previousNodeId === "null") {
            refinedObject["root"] = [bronzeLayer[i]];
            traverseList.push(bronzeLayer[i]);
            break;
          }
        }
        console.log("found root", traverseList);
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
        console.log("silver layer data", refinedObject);
        setSilverLayer(refinedObject);
        //initial goldLayer Load...
        if (!goldLayer) {
          let ticker = refinedObject["root"];
          let refinedArray = [];
          while (ticker) {
            refinedArray.push(ticker[0]);
            ticker = refinedObject[ticker[0].id];
          }
          console.log("gold layer data", refinedArray);
          setGoldlayer(refinedArray);
        }
      }
      setLoading(false);
    })();
  }, [bronzeLayer]);

  const controllsCheckerLeft = (data: any) => {
    if (data.previousNodeId !== null) {
      let list = silverLayer[data.previousNodeId];
      if (list) {
        if (list.length <= 1 || data.id === list[0].id) {
          return false;
        } else {
          return true;
        }
      }
    } else {
      return false;
    }
  };

  const controllsCheckerRight = (data: any) => {
    if (data.previousNodeId !== null) {
      let list = silverLayer[data.previousNodeId];
      if (list) {
        if (list.length <= 1 || data.id === list[list.length - 1].id) {
          return false;
        } else {
          return true;
        }
      }
    } else {
      return false;
    }
  };

  const treeController = (data: any, method: string) => {
    let newGoldLayer = [];
    for (let i = 0; i < goldLayer.length; i++) {
      if (goldLayer[i].id === data.id) {
        break;
      }
      newGoldLayer.push(goldLayer[i]);
    }
    let traverseArr = silverLayer[data.previousNodeId];
    if (method === "left") {
      let i = 1;
      for (i = 1; i < traverseArr.length; i++) {
        if (traverseArr[i].id === data.id) {
          break;
        }
      }
      let ticker = [traverseArr[i - 1]];
      while (ticker) {
        newGoldLayer.push(ticker[0]);
        ticker = silverLayer[ticker[0].id];
      }
      setGoldlayer(newGoldLayer);
    } else {
      let i = 0;
      for (i = 0; i < traverseArr.length - 1; i++) {
        if (traverseArr[i].id === data.id) {
          break;
        }
      }
      let ticker = [traverseArr[i + 1]];
      while (ticker) {
        newGoldLayer.push(ticker[0]);
        ticker = silverLayer[ticker[0].id];
      }
      setGoldlayer(newGoldLayer);
    }
  };

  const promptSubmit = async () => {
    setLoading(true);
    // console.log("prompt submit", input);
    //call the api 101
    if (goldLayer && goldLayer.length === 0) {
      //first prompt
      let body = {
        model: storyData.model,
        temperature: Number(storyData.temperature),
        userid: localStorage.getItem("credId"),
        prompt: input,
        templateStyle: "startNew",
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
      const result = await JSON.parse(resWithoutStreaming);
      // console.log(result, "new");
      //store to DB
      const res = {
        storyId: storyData.id,
        context: result.story,
        title: result.title ? result.title : "null",
        previousNodeId: "null",
        userId: localStorage.getItem("credId"),
        publishedStatus: "false",
        prompt: input,
      };
      await createNode(res);
      //push it to bronzeLayer
      let temp = [...bronzeLayer, res];
      // console.log("new bronzelayer", temp);
      setBronzeLayer(temp);
      //push to gold layer
      let tempG = [...goldLayer, res];
      setGoldlayer(tempG);
    } else if (goldLayer && goldLayer.length >= 1) {
      //continue prompt
      // console.log("continue block triggered");
      let previousStory = "";
      for (let i = 0; i < goldLayer.length; i++) {
        previousStory = previousStory + goldLayer[i].context + " ";
      }
      // console.log("previous story", previousStory);
      let body = {
        model: storyData.model,
        temperature: Number(storyData.temperature),
        userid: localStorage.getItem("credId"),
        prompt: input,
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
      const result = await JSON.parse(resWithoutStreaming);
      // console.log(result, "continue");
      //store to DB
      const res = {
        storyId: storyData.id,
        context: result.story,
        title: result.title,
        minifiedContext: result.title,
        previousNodeId: goldLayer[goldLayer.length - 1].id,
        userId: localStorage.getItem("credId"),
        publishedStatus: "false",
        prompt: input,
      };
      await createNode(res);
    }
    setLoading(false);
    //101
    //clear input + loaders
    setInput("");
  };

  const createNode = async (data: any) => {
    const requestOptions: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": " application/json; charset=utf-8",
      },
      body: JSON.stringify(data),
    };
    const response = await fetch("/api/createNode", requestOptions);
    const resWithoutStreaming = await new Response(response.body).text();
    const result = await JSON.parse(resWithoutStreaming);
    // console.log(resWithoutStreaming);
    if (result.status !== "success") {
      //101 api DB problem
    } else {
      //push it to bronzeLayer
      let temp = [...bronzeLayer, result.data];
      setBronzeLayer(temp);
      //push to gold layer
      let tempG = [...goldLayer, result.data];
      console.log(tempG, "new gold layer data");
      setGoldlayer(tempG);
    }
    console.log("node save", result);
  };

  const regenerate = async (index: any) => {};

  const rephrase = async (index: any) => {};

  const addNode = async (index: any) => {};

  const deleteNode = async (index: any) => {
    setDeleteProgress([0, goldLayer.length - index]);
    let tracker = 0;
    for (let i = index; i < goldLayer.length; i++) {
      let body = {
        id: goldLayer[i].id,
      };
      const requestOptions: RequestInit = {
        method: "POST",
        headers: {
          "Content-Type": " application/json; charset=utf-8",
        },
        body: JSON.stringify(body),
      };
      const response = await fetch("/api/deleteNode", requestOptions);
      const resWithoutStreaming = await new Response(response.body).text();
      const result = await JSON.parse(resWithoutStreaming);
      if (result.status === "success") {
        tracker += 1;
        setDeleteProgress([tracker, goldLayer.length - index]);
      }
    }
    //delete sequence completed...
    setDeleteProgress([0, 0]);
    setIsModalOpen(false);

    //update bronze layer...
    let filteredArray = bronzeLayer;
    for (let node = index; node < goldLayer.length; node++) {
      filteredArray = bronzeLayer.filter(
        (obj: any) => obj.id !== goldLayer[node].id
      );
    }
    setBronzeLayer(filteredArray);

    //update gold layer...
    let tempGold = goldLayer.slice(0, index);
    setGoldlayer(tempGold);

    //reset the trigger index
    setTriggerIndex(-1);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    deleteNode(triggerIndex);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setTriggerIndex(-1);
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
          <p className={styles.storyTitle}>
            {storyData ? storyData.title : ""}
          </p>
          {goldLayer &&
            goldLayer.map((data: any, index: number) => {
              return (
                <div
                  key={data.id}
                  className={
                    !controllsCheckerLeft(data) && !controllsCheckerRight(data)
                      ? styles.chatContainerLRMargin
                      : !controllsCheckerLeft(data)
                      ? styles.chatContainerLeftMargin
                      : !controllsCheckerRight(data)
                      ? styles.chatContainerRightMargin
                      : styles.chatContainer
                  }
                >
                  {controllsCheckerLeft(data) ? (
                    <LeftOutlined
                      className={styles.controls}
                      onClick={() => {
                        treeController(data, "left");
                      }}
                    />
                  ) : null}

                  <div style={{ width: "100%" }}>
                    <div className={styles.promptDiv}>
                      {editingMode[0] === index &&
                      editingMode[1] === 0 &&
                      editData ? (
                        <>
                          <Input
                            value={editData?.prompt}
                            onChange={(e) => {
                              console.log("edit fucn-", e.target.value)
                              let temp = editData;
                              temp["prompt"] = e.target.value;
                              console.log("edit fucn-", temp)
                              setEditData(temp);
                            }}
                          />
                          <Button
                            style={{ margin: "0px 3px", padding: " 0 8px" }}
                            onClick={() => {
                              //call the regen api.. 101
                            }}
                          >
                            <CheckOutlined />
                          </Button>
                          <Button
                            style={{ margin: "0px 3px", padding: " 0 8px" }}
                            onClick={() => {
                              setEditingMode([-1, -1]);
                              setEditData(null);
                            }}
                          >
                            <CloseOutlined />
                          </Button>
                        </>
                      ) : (
                        <p className={styles.promptText}>{data.prompt}</p>
                      )}
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
                        {data.previousNodeId !== "null" ? (
                          editingMode[0] === index &&
                          editingMode[1] === 1 &&
                          editData ? (
                            <Input
                              className={styles.title}
                              value={editData?.minifiedContext}
                              onChange={(e) => {
                                let temp = editData;
                                temp["minifiedContext"] = e.target.value;
                                setEditData(temp);
                              }}
                            />
                          ) : (
                            <p className={styles.title}>
                              <span className={styles.titleTitle}>
                                Title : &nbsp;
                              </span>
                              {data.minifiedContext}
                            </p>
                          )
                        ) : null}
                        {editingMode[0] === index &&
                        editingMode[1] === 1 &&
                        editData ? (
                          <>
                            <TextArea
                              className={styles.storyBlock}
                              rows={4}
                              value={data.context}
                            />
                            <br />
                            <div className={styles.StoryEditDivController}>
                              <Button
                                style={{ margin: "0px 3px", padding: " 0 8px" }}
                                onClick={() => {
                                  //call the regen api.. 101
                                }}
                              >
                                <CheckOutlined />
                              </Button>
                              <Button
                                style={{ margin: "0px 3px", padding: " 0 8px" }}
                                onClick={() => {
                                  setEditingMode([-1, -1]);
                                  setEditData(null);
                                }}
                              >
                                <CloseOutlined />
                              </Button>
                            </div>
                          </>
                        ) : (
                          <p className={styles.storyBlock}>{data.context}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  {controllsCheckerRight(data) ? (
                    <RightOutlined
                      className={styles.controls}
                      onClick={() => {
                        treeController(data, "right");
                      }}
                    />
                  ) : null}
                  <div className={styles.floaterContollerDiv}>
                    {goldLayer[goldLayer.length - 1].id === data.id ? (
                      <>
                        <RedoOutlined
                          onClick={() => {
                            regenerate(index);
                          }}
                          className={styles.controlIcons}
                        />
                        <Popover
                          content={
                            <div>
                              <Flex gap="small" wrap="wrap">
                                <Button
                                  onClick={() => {
                                    const temp = data
                                    setEditData(temp);
                                    setEditingMode([index, 0]);
                                  }}
                                >
                                  Edit prompt
                                </Button>
                                <Button
                                  onClick={() => {
                                    setEditingMode([index, 1]);
                                  }}
                                >
                                  Edit Story
                                </Button>
                              </Flex>
                            </div>
                          }
                          trigger="hover"
                        >
                          <FormOutlined
                            onClick={() => {
                              rephrase(index);
                            }}
                            className={styles.controlIcons}
                          />
                        </Popover>
                      </>
                    ) : null}
                    <PlusOutlined
                      onClick={() => {
                        addNode(index);
                      }}
                      className={styles.controlIcons}
                    />
                    <DeleteOutlined
                      onClick={() => {
                        setTriggerIndex(index);
                        showModal();
                        // deleteNode(index);
                      }}
                      className={styles.controlIconsdelete}
                    />
                  </div>
                </div>
              );
            })}
          {loading ? (
            <div className={styles.chatContainer} style={{ padding: "16px" }}>
              <Skeleton
                loading={loading}
                active
                avatar
                paragraph={{ rows: 4 }}
              />
            </div>
          ) : null}
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

      <Modal
        title="Delete Cofirm"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {deleteProgress[1] === 0 ? (
          <p>All the nodes below this node will also be deleted!</p>
        ) : (
          <Progress
            percent={Math.floor((deleteProgress[0] / deleteProgress[1]) * 100)}
            strokeColor={{ "0%": "#108ee9", "100%": "#87d068" }}
          />
        )}
      </Modal>
    </>
  );
};

export default PageTwo;
