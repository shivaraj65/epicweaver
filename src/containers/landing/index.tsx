import React, { useState } from "react";
import Image from "next/image";
import styles from "./landing.module.css";

import { Button, Row, Col, Card } from "antd";

const { Meta } = Card;

// images import
import Image1 from "@/assets/images/tyler-nix-q-motCAvPBM-unsplash.jpg";

const Landing = () => {
  const [test, settest] = useState(null);

  return (
    <div>
      <div className={styles.landingBg}>
        <div className={styles.innerContainer}>
          <h1 className={styles.brandText}>Epic Weaver</h1>
          <br />
          <h5 className={styles.brandPhrase}>
            Your AI powered Story writing assistant
          </h5>
          <br />
          <div className={styles.buttonContainer}>
            <Button className={styles.button1} size="large">
              Signup
            </Button>
            <Button className={styles.button2} size="large">
              Login
            </Button>
          </div>

          <p className={styles.contentB}>
            A quick and easy way to build stories for{" "}
            <span className={styles.badge}>Story3.com</span>{" "}
          </p>
        </div>
      </div>
      <hr />
      {/* features section */}
      <div className={styles.featureSection}>
        <h4 className={styles.featureHeading}>Why Epic Weaver ?</h4>
        <Row>
          <Col span={6} className={styles.colStyle}>
            <Card
              hoverable
              cover={
                <img
                  alt="example"
                  src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                />
              }
            >
              <Meta
                title="Europe Street beat"
                description="www.instagram.com"
              />
            </Card>
          </Col>
          <Col span={6} className={styles.colStyle}>
            <Card
              hoverable
              cover={
                <img
                  alt="example"
                  src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                />
              }
            >
              <Meta
                title="Europe Street beat"
                description="www.instagram.com"
              />
            </Card>
          </Col>
          <Col span={6} className={styles.colStyle}>
            <Card
              hoverable
              cover={
                <img
                  alt="example"
                  src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                />
              }
            >
              <Meta
                title="Europe Street beat"
                description="www.instagram.com"
              />
            </Card>
          </Col>
          <Col span={6} className={styles.colStyle}>
            <Card
              hoverable
              cover={
                <img
                  alt="example"
                  src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                />
              }
            >
              <Meta
                title="Europe Street beat"
                description="www.instagram.com"
              />
            </Card>
          </Col>
        </Row>
      </div>
      {/* partnerships */}
      <div className={styles.featureSection}>
        <h4 className={styles.featureHeading}>Collaborations</h4>
        <span className={styles.partnershipText}>story3 logo here</span>
        <p className={styles.partnershipText}>
          Epic Weaver is a AI tool crafted to work with Story3 platform
        </p>
        <p className={styles.partnershipText}>Let readers choose the ending!</p>
      </div>

      {/* footer */}
      <div className={styles.footerSection}>
        <p className={styles.footerMade}>made with 💖 in INDIA</p>
        <span>Copyright © Then, Now & Forever - Team CuriosityEngine</span>
      </div>
      {/* <Image
            className={styles.logo}
            src="/next.svg"
            alt="Next.js Logo"
            width={180}
            height={37}
            priority
          /> */}
    </div>
  );
};

export default Landing;
