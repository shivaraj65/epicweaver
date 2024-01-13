import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./settings.module.css";
import { useRouter } from "next/router";

import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Row, Col, Input, message, Modal, Skeleton } from "antd";

const Settings = () => {
  const router = useRouter();

  const [messageApi, contextHolder] = message.useMessage();

  const [cred, setCred] = useState<any>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  //modal update Data
  const [name, setName] = useState("");
  const [story3, setStory3] = useState("");
  const [palm, setPalm] = useState("");
  const [gpt35, setGpt35] = useState("");
  const [gpt4, setGpt4] = useState("");

  const showModal = () => {
    setIsModalOpen(true);
    if(cred){
        let temp=null
        setName(cred.name)
        temp = cred?.story3ApiKey !==null ? cred?.story3ApiKey :""
        setStory3(temp)
        temp = cred?.palmApiKey !==null ? cred?.palmApiKey :""
        setPalm(temp)
        temp = cred?.gpt35Key !==null ? cred?.gpt35Key :""
        setGpt35(temp)
        temp = cred?.gpt4Key !==null ? cred?.gpt4Key :""
        setGpt4(temp)
    }
    
  };

  const handleOk = async () => {
    if (name !== "") {
      let body = {
        id: cred.id,
        name: name,
        story3ApiKey: story3 === "" ? null : story3,
        palmApiKey: palm === "" ? null : palm,
        gpt35Key: gpt35 === "" ? null : gpt35,
        gpt4Key: gpt4 === "" ? gpt4 : null,
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
      const result = await JSON.parse(resWithoutStreaming);

      if (result.status === "success") {
        console.log(result);
        setIsModalOpen(false);
        fetchUserDetails();
      } else {
        messageApi.open({
          type: "error",
          content: "Server error!",
        });
      }
    } else {
      messageApi.open({
        type: "warning",
        content: "Enter a name to submit",
      });
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    //set the states to default values. 101
  };

  const checkCredIdInLocalStorage = () => {
    return localStorage.getItem("credId");
  };

  const checkCredNameInLocalStorage = () => {
    return localStorage.getItem("credName");
  };

  const fetchUserDetails = async () => {
    let body = {
      id: localStorage.getItem("credId"),
    };
    const requestOptions: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": " application/json; charset=utf-8",
      },
      body: JSON.stringify(body),
    };
    const response = await fetch("/api/getUserDetails", requestOptions);
    const resWithoutStreaming = await new Response(response.body).text();
    const result = await JSON.parse(resWithoutStreaming);
    console.log(result);
    if (result.status === "success") {
      setCred(result.data[0]);
    } else {
      messageApi.open({
        type: "error",
        content: "Server error!",
      });
    }
  };

  useEffect(() => {
    if (!checkCredIdInLocalStorage()) {
      router.push("/");
    } else {
      fetchUserDetails();
    }
  }, []);

  return (
    <div className={styles.rootContainer}>
      {contextHolder}
      <div className={styles.container}>
        <span className={styles.headerTitle}>Settings</span>
        <Row className={styles.row}>
          <Col span={3} className={styles.userIconDiv}>
            <img
              width="60"
              height="60"
              src="https://img.icons8.com/stickers/100/user.png"
              alt="user"
              className={styles.userIcon}
            />
          </Col>
          <Col span={21} className={styles.userDetails}>
            {cred ? (
              <>
                <Row>
                  <Col span={8} className={styles.tableCol1}>
                    <p>User ID</p>
                  </Col>
                  <Col span={16} className={styles.tableCol2}>
                    <p>{cred?.id}</p>
                  </Col>
                </Row>
                <Row>
                  <Col span={8} className={styles.tableCol1}>
                    <p>User Name </p>
                  </Col>
                  <Col span={16} className={styles.tableCol2}>
                    <p>{cred?.name}</p>
                  </Col>
                </Row>
                <Row>
                  <Col span={8} className={styles.tableCol1}>
                    <p>Email ID </p>
                  </Col>
                  <Col span={16} className={styles.tableCol2}>
                    <p>{cred?.email}</p>
                  </Col>
                </Row>
                <Row>
                  <Col span={8} className={styles.tableCol1}>
                    <p>Story3 Api Key</p>
                  </Col>
                  <Col span={16} className={styles.tableCol2}>
                    <p>
                      {cred?.story3ApiKey ? (
                        <Input.Password
                          placeholder="api key"
                          iconRender={(visible) =>
                            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                          }
                          value={cred?.story3ApiKey}
                        />
                      ) : (
                        "NA"
                      )}
                    </p>
                  </Col>
                </Row>
                <Row>
                  <Col span={8} className={styles.tableCol1}>
                    <p>PALM Api Key</p>
                  </Col>
                  <Col span={16} className={styles.tableCol2}>
                    <p>
                      {cred?.palmApiKey ? (
                        <Input.Password
                          placeholder="api key"
                          iconRender={(visible) =>
                            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                          }
                          value={cred?.palmApiKey}
                        />
                      ) : (
                        "NA"
                      )}
                    </p>
                  </Col>
                </Row>

                <Row>
                  <Col span={8} className={styles.tableCol1}>
                    <p>GPT 3.5 Api key</p>
                  </Col>
                  <Col span={16} className={styles.tableCol2}>
                    <p>
                      {cred?.gpt35Key ? (
                        <Input.Password
                          placeholder="api key"
                          iconRender={(visible) =>
                            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                          }
                          value={cred?.gpt35Key}
                        />
                      ) : (
                        "NA"
                      )}
                    </p>
                  </Col>
                </Row>
                <Row>
                  <Col span={8} className={styles.tableCol1}>
                    <p>GPT 4 Api Key</p>
                  </Col>
                  <Col span={16} className={styles.tableCol2}>
                    <p>
                      {cred?.gpt4Key ? (
                        <Input.Password
                          placeholder="api key"
                          iconRender={(visible) =>
                            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                          }
                          value={cred?.gpt4Key}
                        />
                      ) : (
                        "NA"
                      )}
                    </p>
                  </Col>
                </Row>
                <Button
                  style={{
                    color: "#57c5b6 !important",
                    border: "1px solid #57c5b6 !important",
                  }}
                  onClick={() => {
                    showModal();
                  }}
                >
                  Update / Modify{" "}
                </Button>
              </>
            ) : (
              <Skeleton active />
            )}
          </Col>
        </Row>
      </div>

      <Modal
        title="Update Profile"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div>
          <Row>
            <Col span={6}>
              <p className={styles.modalMableCol1}>User Name </p>
            </Col>
            <Col span={18}>
              <Input
                placeholder="Name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <p className={styles.modalMableCol1}>Story3 Key</p>
            </Col>
            <Col span={18}>
              <Input.Password
                placeholder="api key"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                value={story3}
                onChange={(e) => {
                  setStory3(e.target.value);
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <p className={styles.modalMableCol1}>PALM Key</p>
            </Col>
            <Col span={18}>
              <Input.Password
                placeholder="api key"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                value={palm}
                onChange={(e) => {
                  setPalm(e.target.value);
                }}
              />
            </Col>
          </Row>

          <Row>
            <Col span={6}>
              <p className={styles.modalMableCol1}>GPT 3.5 key</p>
            </Col>
            <Col span={18}>
              <Input.Password
                placeholder="api key"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                value={gpt35}
                onChange={(e) => {
                  setGpt35(e.target.value);
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <p className={styles.modalMableCol1}>GPT 4 Key</p>
            </Col>
            <Col span={18}>
              <Input.Password
                placeholder="api key"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                value={gpt4}
                onChange={(e) => {
                  setGpt4(e.target.value);
                }}
              />
            </Col>
          </Row>
        </div>
      </Modal>
    </div>
  );
};

export default Settings;
