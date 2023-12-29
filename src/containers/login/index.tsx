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

import LoginBg from "@/assets/images/s-o-c-i-a-l-c-u-t-FluPNkHfCTs-unsplash.jpg";

const LoginContainer = () => {
  return (
    <div>
      <Row className={styles.loginRow}>
        <Col span={16} className={styles.loginImage}></Col>
        <Col span={8} className={styles.loginCardOuter}>
          <div className={styles.loginCard}>
            <h5 className={styles.loginTitle}>login</h5>
            <Input
              className={styles.inputStyles}
              size="large"
              placeholder="Email ID"
              prefix={<UserOutlined />}
            />
            <Input.Password
              className={styles.inputStyles}
              size="large"
              placeholder="password"
            />
            <Button size="large" block className={styles.loginButton}>
              LOGIN
            </Button>
            <p className={styles.loginLink}>
              Don't have an Account! <Link href="/signup">Signup</Link>
            </p>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default LoginContainer;
