import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import styles from "./dashboard.module.css";

import { Button, Row, Col, Input, message, Layout, Divider } from "antd";
import {
  CompassOutlined,
  FolderOpenOutlined,
  ControlOutlined,
  EditOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Header, Content, Footer, Sider } = Layout;

const Dashboard = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);

  const menuItems: any = [
    { name: "Explore", icon: <CompassOutlined /> },
    { name: "Workspace", icon: <FolderOpenOutlined /> },
    { name: "Settings", icon: <ControlOutlined /> },
    { name: "Create story", icon: <EditOutlined /> },
  ];

  return (
    <>
      <Layout className={styles.dashContainer}>
        <Sider
          theme="light"
          //   color="#DAFFFB"
          className={styles.sidebarContainer}
          breakpoint="xxl"
          collapsedWidth="0"
          onBreakpoint={(broken: any) => {
            console.log(broken);
          }}
          onCollapse={(collapsed: any, type: any) => {
            console.log(collapsed, type);
          }}
        >
          <div className={styles.spaceBtwn}>
            <div>
              <div className={styles.brandContainer}>
                <h1 className={styles.brandText}>Epic Weaver</h1>
              </div>
              {menuItems.map((data: any, index: number) => {
                return (
                  <>
                    <div
                      key={index}
                      className={
                        selectedMenu === index
                          ? styles.menuItemSelected
                          : styles.menuItem
                      }
                      onClick={() => {
                        setSelectedMenu(index);
                      }}
                    >
                      {data?.icon}&nbsp;&nbsp;<p>{data?.name}</p>
                    </div>
                    <Divider className={styles.divider} />
                  </>
                );
              })}
            </div>
            <div className={styles.profile}>
              <UserOutlined />
              &nbsp;&nbsp;user profile
            </div>
          </div>
        </Sider>
        <Layout>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              height: "100vh",
              backgroundColor: "#efefef",
            }}
          >
            content
          </div>
        </Layout>
      </Layout>
    </>
  );
};

export default Dashboard;
