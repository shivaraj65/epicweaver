import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./login.module.css";

import { Button, Row, Col, Input } from "antd";
import {
  UserOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";


const LoginContainer = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = () => {
    console.log("submit action");
    console.log(email, password);
    //api call
  };

  return (
    <div>
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
