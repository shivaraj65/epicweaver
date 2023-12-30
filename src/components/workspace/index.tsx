import { useState } from "react";
import styles from "./workspace.module.css";

import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  ReadOutlined
} from "@ant-design/icons";
import { Avatar, Card, Row, Col } from "antd";

const { Meta } = Card;

const Dummy = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const Workspace = () => {
  return (
    <div className={styles.workspaceContainer}>
      <div className={styles.header}>
        <p>Workspace</p>
      </div>
      <div className={styles.recentWorks}>
        <p className={styles.sectionTitle}>Your recent works</p>

        <Row>
          {Dummy.map((data, index) => {
            return (
              <Col span={4} className={styles.colStyle} key={index}>
                <Card
                  style={{ width: 170 }}
                  cover={
                    <div style={{display:"flex",justifyContent:"center",marginTop:"10px"}}>
                        <img width="50" height="50" src="https://img.icons8.com/color/96/open-book--v1.png" alt="open-book--v1"/>
                    </div>
                    
                  }
                  actions={[
                    <SettingOutlined key="setting" />,
                    <EditOutlined key="edit" />,
                    <EllipsisOutlined key="ellipsis" />,
                  ]}
                >
                  <Meta
                    // avatar={
                    //   <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
                    // }
                    // title="Card title"
                    description="This is the description"
                  />
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
};

export default Workspace;
