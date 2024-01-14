import { useEffect, useState } from "react";
import styles from "./workspace.module.css";
import { useRouter } from "next/router";

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
import { Row, Col, Popover, Badge, Skeleton, Input } from "antd";
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

  const showModal = (type: any) => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    if (modalMethod === 0) {
      await rename(workingIndexData);
    } else if(modalMethod === 1){

    }else if(modalMethod === 2){

    }else if(modalMethod === 3){
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

  const deleteStory = async (data:any) => {
    //101 fix content related to the story not deleted...
    let body = {
      id: data.id
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
                                        <span className={styles.popoverItem}>
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
