import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./signup.module.css";


import { Button, Row, Col, Input } from "antd";
import {
  UserOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  CloseOutlined,
} from "@ant-design/icons";

const SignupContainer = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async () => {
    console.log("submit action");
    console.log(name, email, password);
    //api call
    if (name !== "") {
    }

    let body = {
      name: name,
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
    const response = await fetch("/api/signup", requestOptions);
    const resWithoutStreaming = await new Response(response.body).text();
    const result = await JSON.parse(resWithoutStreaming);
    console.log(result);
  };

  return (
    <div>
      <div className={styles.closeFloater} onClick={() => router.push("/")}>
        <CloseOutlined />
      </div>
      <Row className={styles.signupRow}>
        <Col span={16} className={styles.signupImage}></Col>
        <Col span={8} className={styles.signupCardOuter}>
          <div className={styles.signupCard}>
            <h5 className={styles.signupTitle}>Signup</h5>
            <Input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              className={styles.inputStyles}
              size="large"
              placeholder="User name"
              prefix={<UserOutlined />}
            />
            <Input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className={styles.inputStyles}
              size="large"
              placeholder="Email ID"
              // prefix={<UserOutlined />}
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
              className={styles.signupButton}
              onClick={() => {
                submit();
              }}
            >
              Create Account
            </Button>
            <p className={styles.signupLink}>
              already have an Account! <Link href="/login">Login</Link>
            </p>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default SignupContainer;
