import { useState } from "react";
import styles from "./create.module.css";
import { useRouter } from "next/router";

import { Breadcrumb } from "antd";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";

import userCreds from "@/store/userCreds";
import { useShallow } from "zustand/react/shallow";

const Create = () => {
  const router = useRouter();

  const [pageFlag, setPageFlag] = userCreds(
    useShallow((state) => [state.pageFlag, state.setPageFlag])
  );

  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item
          onClick={() => {
            setPageFlag(0);
          }}
          className={styles.breadcrumbItem}
        >
          Workspace
        </Breadcrumb.Item>
        <Breadcrumb.Item className={styles.breadcrumbItem}>
          Create Story
        </Breadcrumb.Item>
      </Breadcrumb>
      <div className={styles.createContainer}>
            content
      </div>
    </div>
  );
};

export default Create;
