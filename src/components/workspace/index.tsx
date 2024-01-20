import { useEffect, useState } from "react";
import styles from "./workspace.module.css";
import { useRouter } from "next/router";

//send for analysing and progress bar and message system is yet to be done in this page.
//unpublish api.

import {
  EditOutlined,
  MoreOutlined,
  ThunderboltOutlined,
  ReadOutlined,
  EyeInvisibleOutlined,
  CloudUploadOutlined,
  RestOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Row, Col, Popover, Badge, Skeleton, Input, Progress } from "antd";
import { Button, Modal } from "antd";

import userCreds from "@/store/userCreds";
import { useShallow } from "zustand/react/shallow";

import Create from "@/components/create";

// const Dummy: any = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const Workspace = () => {
  const router = useRouter();

  const [pageFlag, setPageFlag, setStoryData] = userCreds(
    useShallow((state) => [
      state.pageFlag,
      state.setPageFlag,
      state.setStoryData,
    ])
  );

  const [data, setData] = useState<any>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [workingIndexData, setWorkingIndexData] = useState<any>(null);

  const [modalMethod, setModalMethod] = useState<any>(-1);

  const [input, setInput] = useState("");

  const [publishStatus, setPublishStatus] = useState("")

  const [publishProgress, setPublishProgress] = useState<any>([0, 0]);

  const showModal = (type: any) => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    if (modalMethod === 0) {
      await rename(workingIndexData);
    } else if (modalMethod === 1) {
    } else if (modalMethod === 2) {
    } else if (modalMethod === 3) {
      await deleteStory(workingIndexData);
    }

    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setInput("");
    setWorkingIndexData(null);
  };

  useEffect(() => {
    if (pageFlag === 0) {
      setStoryData(null);
    }
    if (localStorage.getItem("credId")) {
      loadData();
    } else {
      router.push("/");
    }
  }, [pageFlag]);

  const loadData = async () => {
    const requestOptions: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": " application/json; charset=utf-8",
      },
      body: JSON.stringify({ userId: localStorage.getItem("credId") }),
    };
    const response = await fetch("/api/getAllStoriesByUser", requestOptions);
    const resWithoutStreaming = await new Response(response.body).text();
    const result = await JSON.parse(resWithoutStreaming);
    // console.log(result);
    if (result.status === "success") {
      setData(result.data);
    } else {
      alert("error message"); //101
    }
  };

  const rename = async (data: any) => {
    let body = {
      id: data.id,
      title: input,
      model: data.model,
      temperature: data.temperature,
      publishedStatus: data.publishedStatus,
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
    const result = await JSON.parse(resWithoutStreaming);
    //reload api..
    if (result.status === "success") {
      loadData();
      setInput("");
      setWorkingIndexData(null);
    } else {
      //101 error
      setWorkingIndexData(null);
    }
  };

  const deleteStory = async (data: any) => {
    //101 fix content related to the story not deleted...
    let body = {
      id: data.id,
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
    const result = await JSON.parse(resWithoutStreaming);
    if (result.status === "success") {
      loadData();
      setWorkingIndexData(null);
    } else {
      //101 error
      setWorkingIndexData(null);
    }
  };

  const publishStory = async (data: any) => {
    //fetch context for story.
    console.log(data);
    setPublishStatus("Fetching Data");
    let bronzeLayer: any = await getStoryContext(data.id);
    setPublishProgress([0, bronzeLayer.length]);
    console.log(bronzeLayer);
    if (bronzeLayer === 500) {
      //101 error...
      //eat five star do nothing.
    } else {
      // let bronzeLen:any = bronzeLayer.length

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
      // console.log("found root", traverseList);
      //process bronze layer to silver layer...
      for (let i = 0; i < traverseList.length; i++) {
        let tempArr: any = [];
        for (let j = i + 1; j < bronzeLayer.length; j++) {
          if (!traverseList.some((obj: any) => obj.id === bronzeLayer[j].id)) {
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
      let silverLayer = refinedObject;

      let ticker: any = silverLayer["root"];
      let bufferArray: any = silverLayer["root"];
      let resMapObj: any = {};

      setPublishStatus("Sending Story to STORY3")
      for (let i = 0; i < bufferArray.length; i++) {
        setPublishProgress([i,bufferArray.length])
        if (i === 0) {
          //for root push only...
          bufferArray = bufferArray.concat(silverLayer[bufferArray[i].id]);
          console.log("after ", i, " buffer arr", bufferArray);
        } else {
          if (silverLayer[bufferArray[i].id]) {
            bufferArray = bufferArray.concat(silverLayer[bufferArray[i].id]);
          }
          console.log("after ", i, " buffer arr", bufferArray);
        }
        let res: any = null;

        //push one by one to story3.
        if (i === 0) {
          res = await pushStory(data.title, bufferArray[i].context);
          console.log("story push data res:- ", res.hashId);
          if (res) {
            //save the hashId as obj map.
            resMapObj[bufferArray[i].id] = res.hashId;

            //update the context in the DB..
            await updateNode(bufferArray[i], res.hashId);
          } else {
            //error... rollback
          }
        } else {
          res = await pushTwist(
            bufferArray[i].minifiedContext,
            bufferArray[i].context,
            resMapObj[bufferArray[i].previousNodeId]
          );
          console.log("twist push data res:- ", res);
          if (res) {
            //save the hashId as obj map.
            resMapObj[bufferArray[i].id] = res.hashId;

            //update the context in the DB..
            await updateNode(bufferArray[i], res.hashId);
          } else {
            //error... rollback
          }
        }
      }
      setPublishProgress([0,0])
      console.log(resMapObj);
      setPublishStatus("Analysing the Twists.")
      //send for analyzing all the stories.
      const analyzeArr = Object.values(resMapObj);
      for (let i = 0; i < analyzeArr.length; i++) {
        setPublishProgress([i,analyzeArr.length])
        analysing(analyzeArr[i]);
      }
    }
    setPublishProgress([0,0]);
    //send the message for publishing the story from story3 manually.
  };

  const pushStory = async (title: any, story: any) => {
    let body = {
      title: title,
      story: story,
    };
    const requestOptions: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": " application/json; charset=utf-8",
      },
      body: JSON.stringify(body),
    };
    const response = await fetch("/api/postStory", requestOptions);
    const resWithoutStreaming = await new Response(response.body).text();
    const result = await JSON.parse(resWithoutStreaming);
    if (result.status === "success") {
      return result.data;
    } else {
      //101 error..
      console.log("api error at fetching data");
      return null;
    }
  };

  const pushTwist = async (title: any, story: any, hashParentId: any) => {
    let body = {
      title: title,
      story: story,
      hashParentId: hashParentId,
    };
    // console.log(body,"body")
    const requestOptions: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": " application/json; charset=utf-8",
      },
      body: JSON.stringify(body),
    };
    const response = await fetch("/api/postTwist", requestOptions);
    const resWithoutStreaming = await new Response(response.body).text();
    const result = await JSON.parse(resWithoutStreaming);
    if (result.status === "success") {
      return result.data;
    } else {
      //101 error..
      console.log("api error at fetching data");
      return null;
    }
  };

  const analysing = async (id: any) => {
    let body = {
      hashId: id,
    };
    const requestOptions: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": " application/json; charset=utf-8",
      },
      body: JSON.stringify(body),
    };
    const response = await fetch("/api/postTwistForAnalyzing", requestOptions);
    const resWithoutStreaming = await new Response(response.body).text();
    const result = await JSON.parse(resWithoutStreaming);
    if (result.status === "success") {
      //continue...
     
    } else {
      //error 101 notification...
    }
  };

  const updateNode = async (data: any, hash: any) => {
    let body = {
      id: data.id,
      context: data.context,
      title: data.title,
      publishedStatus: "true",
      prompt: data.prompt,
      publishedHashId: hash,
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

  const getStoryContext = async (id: any) => {
    let body = {
      storyId: id,
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
    if (result.status === "success") {
      return result.data;
    } else {
      //101 error..
      console.log("api error at fetching data");
      return 500;
    }
  };

  return (
    <div className={styles.workspaceContainer}>
      {pageFlag === 0 ? (
        <>
          <div className={styles.header}>
            <p className={styles.headerTitle}>Workspace</p>
            <div
              className={styles.createButton}
              onClick={() => {
                setPageFlag(1);
              }}
            >
              &nbsp; Create Story &nbsp; <ThunderboltOutlined />
            </div>
          </div>
          <div className={styles.recentWorks}>
            <p className={styles.sectionTitle}>Your recent works</p>
            {
              publishProgress[1] !==0 ?
              <div>
                <p>{publishStatus !=="" ? publishStatus : null}</p>
                <Progress
                  percent={Math.floor(
                    (publishProgress[0] / publishProgress[1]) * 100
                  )}
                  strokeColor={{ "0%": "#108ee9", "100%": "#87d068" }}
                />
              </div>
              :null
            }

            <Row>
              {data &&
                data?.map((datai: any, index: number) => {
                  return (
                    <Col span={6} className={styles.colStyle} key={index}>
                      <div className={styles.storyCard}>
                        <Row className={styles.storyCardRow}>
                          <Col span={8}>
                            <div
                              className={styles.storyCardImageDiv}
                              onClick={() => {
                                setStoryData(datai);
                                setPageFlag(1);
                              }}
                            >
                              {/* <img
                              width="50"
                              height="50"
                              src="https://img.icons8.com/color/96/open-book--v1.png"
                              alt="open-book--v1"
                            /> */}
                            </div>
                          </Col>
                          <Col span={16}>
                            <Badge.Ribbon text="Published" color="cyan">
                              <div className={styles.StoryContentDiv}>
                                <div>
                                  <p
                                    className={styles.storyTitle}
                                    onClick={() => {
                                      setStoryData(datai);
                                      setPageFlag(1);
                                    }}
                                  >
                                    {datai.title}
                                  </p>
                                </div>
                                <div className={styles.storyActionItems}>
                                  {/* <EditOutlined
                                  className={styles.storyContorlIcon}
                                /> */}
                                  {/* <ReadOutlined
                                className={styles.storyContorlIcon}
                              /> */}

                                  <Popover
                                    content={
                                      <div>
                                        <span
                                          className={styles.popoverItem}
                                          onClick={async () => {
                                            //101 send message if already published.
                                            setWorkingIndexData(datai);
                                            await setModalMethod(0);
                                            showModal(0);
                                          }}
                                        >
                                          <EditOutlined /> Rename
                                        </span>
                                        <span
                                          className={styles.popoverItem}
                                          onClick={async () => {
                                            publishStory(datai);
                                          }}
                                        >
                                          <CloudUploadOutlined /> Publish
                                        </span>
                                        <span className={styles.popoverItem}>
                                          <EyeInvisibleOutlined /> Unpublish
                                        </span>
                                        {/* <hr style={{color:"#b4b4b4", width:"20%",margin:"auto"}} /> */}
                                        {/* <span className={styles.popoverItemDelete}> <RestOutlined /> delete from story3</span> */}
                                        <span
                                          className={styles.popoverItemDelete}
                                          onClick={async () => {
                                            setWorkingIndexData(datai);
                                            setModalMethod(3);
                                            showModal(3);
                                          }}
                                        >
                                          <DeleteOutlined /> Delete Story
                                        </span>
                                      </div>
                                    }
                                    trigger="hover"
                                    placement="right"
                                  >
                                    <MoreOutlined
                                      className={styles.storyContorlIcon}
                                    />
                                  </Popover>
                                </div>
                              </div>
                            </Badge.Ribbon>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                  );
                })}
            </Row>
            {!data ? (
              <Row>
                <Col span={6} className={styles.colStyle}>
                  <Skeleton active />
                </Col>
                <Col span={6} className={styles.colStyle}>
                  <Skeleton active />
                </Col>
                <Col span={6} className={styles.colStyle}>
                  <Skeleton active />
                </Col>
                <Col span={6} className={styles.colStyle}>
                  <Skeleton active />
                </Col>
              </Row>
            ) : null}
          </div>
        </>
      ) : pageFlag === 1 ? (
        <Create />
      ) : pageFlag === 2 ? (
        <div>reading page</div>
      ) : null}
      <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        {modalMethod === 0 ? (
          <>
            <p className={styles.storyTitle}>Enter the new Title :</p>
            <Input
              autoFocus
              placeholder="title"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
            />
          </>
        ) : null}
        {modalMethod === 3 ? (
          <div>
            <p className={styles.storyTitle}>
              Are you Sure To Delete the story :{" "}
              {workingIndexData ? workingIndexData.title : null}
            </p>
          </div>
        ) : null}
      </Modal>
    </div>
  );
};

export default Workspace;
