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
import { Row, Col, Popover, Badge, Skeleton } from "antd";

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

  useEffect(() => {
    if (pageFlag === 0) {
      setStoryData(null);
    }
    if (localStorage.getItem("credId")) {
      (async () => {
        const requestOptions: RequestInit = {
          method: "POST",
          headers: {
            "Content-Type": " application/json; charset=utf-8",
          },
          body: JSON.stringify({ userId: localStorage.getItem("credId") }),
        };
        const response = await fetch(
          "/api/getAllStoriesByUser",
          requestOptions
        );
        const resWithoutStreaming = await new Response(response.body).text();
        const result = await JSON.parse(resWithoutStreaming);
        // console.log(result);
        if (result.status === "success") {
          setData(result.data);
        } else {
          alert("error message");
        }
      })();
    } else {
      router.push("/");
    }
  }, [pageFlag]);

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
                                        <span className={styles.popoverItem}>
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
                                        >
                                          <DeleteOutlined /> Delete Story
                                        </span>
                                      </div>
                                    }
                                    trigger="click"
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
    </div>
  );
};

export default Workspace;
