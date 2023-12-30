import { useState } from "react";
import styles from "./workspace.module.css";
import { useRouter } from "next/router";

import {
  EditOutlined,
  EllipsisOutlined,
  ThunderboltOutlined,
  ReadOutlined,
} from "@ant-design/icons";
import { Row, Col } from "antd";

const Dummy: any = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const Workspace = () => {
  const router = useRouter();

  return (
    <div className={styles.workspaceContainer}>
      <div className={styles.header}>
        <p className={styles.headerTitle}>Workspace</p>
        <div
          className={styles.createButton}
          onClick={() => {
            //101
          }}
        >
          &nbsp; Create Story &nbsp; <ThunderboltOutlined />
        </div>
      </div>
      <div className={styles.recentWorks}>
        <p className={styles.sectionTitle}>Your recent works</p>

        <Row>
          {Dummy.map((data: any, index: number) => {
            return (
              <Col span={6} className={styles.colStyle} key={index}>
                <div className={styles.storyCard}>
                  <Row className={styles.storyCardRow}>
                    <Col span={6}>
                      <div className={styles.storyCardImageDiv}>
                        <img
                          width="50"
                          height="50"
                          src="https://img.icons8.com/color/96/open-book--v1.png"
                          alt="open-book--v1"
                        />
                      </div>
                    </Col>
                    <Col span={18}>
                      <div className={styles.StoryContentDiv}>
                        <div>
                          <p className={styles.storyTitle}>
                            Some random title
                            1010101001101kjsdfiowieifhwehfowhefh
                          </p>
                        </div>
                        <div className={styles.storyActionItems}>
                          <EditOutlined className={styles.storyContorlIcon} />
                          <ReadOutlined className={styles.storyContorlIcon} />
                          <EllipsisOutlined
                            className={styles.storyContorlIcon}
                          />
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
};

export default Workspace;
