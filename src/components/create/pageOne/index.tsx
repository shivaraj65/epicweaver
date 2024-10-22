import { useState } from "react";
import styles from "./pageOne.module.css";

import { Row, Col, Button, message, Breadcrumb } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";

import userCreds from "@/store/userCreds";
import { useShallow } from "zustand/react/shallow";

import PALM from "@/assets/icons/PALM.svg";
import GPT from "@/assets/icons/GPT.svg";
import Creative from "@/assets/icons/wand.svg";
import Balanced from "@/assets/icons/balanced.svg";
import Precise from "@/assets/icons/precise.svg";

import Tabs from "@/components/ui/tabs";

const Models = [
  { text: "PALM", icon: PALM },
  { text: "GPT 3.5", icon: GPT },
  { text: "GPT 4", icon: GPT },
];

const Temperature = [
  { text: "Creative", icon: Creative },
  { text: "Balanced", icon: Balanced },
  { text: "Precise", icon: Precise },
];

interface Props {
  setPageFlag: Function;
  setCreatePage: Function;
  storyTitle: string;
  setStoryTitle: Function;
  selectedModel: string;
  setSelectedModel: Function;
  temperature: string;
  setTemperature: Function;
}

const PageOne: React.FC<Props> = (props) => {
  const [messageApi, contextHolder] = message.useMessage();

  const [storyData, setStoryData] = userCreds(
    useShallow((state) => [state.storyData, state.setStoryData])
  );

  const validate = async () => {
    if (props.storyTitle !== "") {
      // if (props.selectedModel === "PALM") {
        //api
        let body = {
          title: props.storyTitle,
          model: props.selectedModel,
          temperature:
            props.temperature === "Creative"
              ? "1"
              : props.temperature === "Balanced"
              ? "0.5"
              : props.temperature === "Precise"
              ? "0.1"
              : "1",
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
        const result = await JSON.parse(resWithoutStreaming);
        if (result.status === "success") {
          setStoryData(result.data);
          props.setCreatePage(1);
        } else {
          messageApi.open({
            type: "warning",
            content: "Api Error! refersh the page again.",
          });
        }
      // } else {
      //   messageApi.open({
      //     type: "warning",
      //     content: "Current version only supports PALM model.",
      //   });
      // }
    } else {
      messageApi.open({
        type: "warning",
        content: "Story title seems to be empty!.",
      });
    }
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
        {contextHolder}
        <div className={styles.innerContainer}>
          <Row className={styles.rowStyle}>
            <Col span={12} className={styles.colStyle}>
              <div className={styles.nonSelectorContainer}>
                <p className={styles.nonSelectorTitle}>
                  What&apos;s your story
                </p>
                <input
                  type="text"
                  value={props.storyTitle}
                  onChange={(e) => {
                    props.setStoryTitle(e.target.value);
                  }}
                  className={styles.inputField}
                  autoFocus
                  placeholder="Story Title"
                ></input>
                <Button
                  className={styles.nextButton}
                  onClick={() => {
                    validate();
                  }}
                >
                  Next <CaretRightOutlined />{" "}
                </Button>
              </div>
            </Col>
            <Col span={12} className={styles.colStyle}>
              <div className={styles.selectorContainer}>
                <div className={styles.selectorInnerContainer}>
                  <p className={styles.selectorTitle}>Customize your model</p>
                  <div className={styles.tabsContainer}>
                    <p className={styles.selectorText}>select a Model</p>
                    <Tabs
                      theme={"light"}
                      items={Models}
                      selected={props.selectedModel}
                      onChangeSelected={props.setSelectedModel}
                    />
                    {/* <span className={styles.warningtext}>
                      *GPT models are on the pipeline. Available Soon!
                    </span> */}
                  </div>
                  <div className={styles.tabsContainer}>
                    <p className={styles.selectorText}>select a Temperature</p>
                    <Tabs
                      theme={"light"}
                      items={Temperature}
                      selected={props.temperature}
                      onChangeSelected={props.setTemperature}
                    />
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default PageOne;
