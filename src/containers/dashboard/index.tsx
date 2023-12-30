import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import styles from "./dashboard.module.css";

import userCreds from "@/store/userCreds";
import { useShallow } from "zustand/react/shallow";

import { Button, Row, Col, Input, message, Layout, Divider } from "antd";
import {
  CompassOutlined,
  FolderOpenOutlined,
  ControlOutlined,
  EditOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Header, Content, Footer, Sider } = Layout;

import Explore from "@/components/explore";
import Workspace from "@/components/workspace";
import Settings from "@/components/settings";

const Dashboard = () => {
  const router = useRouter();

  const [credentials, selectedMenu, setSelectedMenu] = userCreds(
    useShallow((state) => [
      state.credentials,
      state.selectedMenu,
      state.setSelectedMenu,
    ])
  );

  const menuItems: any = [
    { name: "Explore", icon: <CompassOutlined /> },
    { name: "Workspace", icon: <FolderOpenOutlined /> },
    { name: "Settings", icon: <ControlOutlined /> },
    { name: "Create story", icon: <EditOutlined /> },
  ];

  const [credName, setCredName] = useState("");

  const checkCredIdInLocalStorage = () => {
    return localStorage.getItem("credId");
  };

  const checkCredNameInLocalStorage = () => {
    return localStorage.getItem("credName");
  };

  useEffect(() => {
    if (!checkCredIdInLocalStorage()) {
      router.push("/");
    } else {
      let data: any = checkCredNameInLocalStorage()
        ? checkCredNameInLocalStorage()
        : "";
      setCredName(data);
    }
  }, [checkCredIdInLocalStorage]);

  return (
    <>
      {credName && credName !== "" ? (
        <Layout className={styles.dashContainer}>
          <Sider
            theme="light"
            className={styles.sidebarContainer}
            breakpoint="xl"
            collapsedWidth="0"
            onBreakpoint={(broken: any) => {
              // console.log(broken);
            }}
            onCollapse={(collapsed: any, type: any) => {
              // console.log(collapsed, type);
            }}
          >
            <div className={styles.spaceBtwn}>
              <div>
                <div className={styles.brandContainer}>
                  <h1 className={styles.brandText}>Epic Weaver</h1>
                </div>
                {menuItems.map((data: any, index: number) => {
                  return (
                    <div key={index + 1}>
                      <div
                        className={
                          selectedMenu === index
                            ? styles.menuItemSelected
                            : styles.menuItem
                        }
                        onClick={() => {
                          if (index === 3) {
                            setSelectedMenu(1);
                            router.push("/dashboard");
                          } else {
                            setSelectedMenu(index);
                          }
                        }}
                      >
                        {data?.icon}&nbsp;&nbsp;<p>{data?.name}</p>
                      </div>
                      <Divider className={styles.divider} />
                    </div>
                  );
                })}
              </div>
              <div className={styles.profile}>
                <UserOutlined />
                &nbsp;&nbsp;&nbsp;
                {credName}
              </div>
            </div>
          </Sider>
          <Layout>
            <div
              style={{
                height: "100vh",
              }}
            >
              {selectedMenu === 0 ? (
                <Explore />
              ) : selectedMenu === 1 ? (
                <Workspace />
              ) : selectedMenu === 2 ? (
                <Settings />
              ) : null}
            </div>
          </Layout>
        </Layout>
      ) : null}
    </>
  );
};

export default Dashboard;
