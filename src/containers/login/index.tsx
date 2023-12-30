import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./login.module.css";

// import userCreds from "@/store/userCreds";
// import { useShallow } from "zustand/react/shallow";

import { Button, Row, Col, Input, message } from "antd";
import {
  UserOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  CloseOutlined,
} from "@ant-design/icons";

const LoginContainer = () => {
  const router = useRouter();

  const [messageApi, contextHolder] = message.useMessage();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async () => {
    console.log("submit action");
    console.log(email, password);
    //api call
    if (email !== "" && password !== "") {
      let body = {
        email: email,
        password: password,
      };
      const requestOptions: RequestInit = {
        method: "POST",
        headers: {
          "Content-Type": " application/json; charset=utf-8",
        },
        body: JSON.stringify(body),
      };
      const response = await fetch("/api/login", requestOptions);
      const resWithoutStreaming = await new Response(response.body).text();
      const result = await JSON.parse(resWithoutStreaming);
      console.log(result);
      if (result.status === "success" && result.data.length > 0) {
        localStorage.setItem('credId', result.data[0].id);
        localStorage.setItem('credName', result.data[0].name);
        localStorage.setItem('credEmail', result.data[0].email);
        router.push("/dashboard");
      } else if (result.status === "failed" ) {
        messageApi.open({
          type: "error",
          content: "email / password is invalid. try again!",
        });
      } else {
        messageApi.open({
          type: "error",
          content: "OOPS! server error. try again later.",
        });
      }
    } else {
      if (email === "") {
        messageApi.open({
          type: "warning",
          content: "email field is empty",
        });
      } else if (password === "") {
        messageApi.open({
          type: "warning",
          content: "password field is empty",
        });
      }
    }
  };

  return (
    <div>
      {contextHolder}
      <div className={styles.closeFloater} onClick={() => router.push("/")}>
        <CloseOutlined />
      </div>
      <Row className={styles.loginRow}>
        <Col span={16} className={styles.loginImage}></Col>
        <Col span={8} className={styles.loginCardOuter}>
          <div className={styles.loginCard}>
            <h5 className={styles.loginTitle}>login</h5>
            <Input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className={styles.inputStyles}
              size="large"
              placeholder="Email ID"
              prefix={<UserOutlined />}
            />
            <Input.Password
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className={styles.inputStyles}
              size="large"
              placeholder="password"
            />
            <Button
              size="large"
              block
              className={styles.loginButton}
              onClick={() => {
                submit();
              }}
            >
              LOGIN
            </Button>
            <p className={styles.loginLink}>
              Don&apos;t have an Account! <Link href="/signup">Signup</Link>
            </p>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default LoginContainer;
