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
} from "@ant-design/icons";

const SignupContainer = () => {
  return (
    <div>     
      <Row className={styles.signupRow}>
        <Col span={16} className={styles.signupImage}></Col>
        <Col span={8} className={styles.signupCardOuter}>
          <div className={styles.signupCard}>
            <h5 className={styles.signupTitle}>Signup</h5>
            <Input
              className={styles.inputStyles}
              size="large"
              placeholder="User name"
              prefix={<UserOutlined />}
            />
            <Input
              className={styles.inputStyles}
              size="large"
              placeholder="Email ID"
              // prefix={<UserOutlined />}
            />
            <Input.Password
              className={styles.inputStyles}
              size="large"
              placeholder="password"
            />
            <Button size="large" block className={styles.signupButton}>
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
