import { useState, useEffect } from "react";
import styles from "./create.module.css";
import { useRouter } from "next/router";

import { Breadcrumb } from "antd";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";

import userCreds from "@/store/userCreds";
import { useShallow } from "zustand/react/shallow";

import PageOne from "./pageOne";
import PageTwo from "./pageTwo";

const Create = () => {
  const router = useRouter();

  const [pageFlag, setPageFlag, storyData] = userCreds(
    useShallow((state) => [state.pageFlag, state.setPageFlag, state.storyData])
  );

  const [createPage, setCreatePage] = useState(0);
  const [storyTitle, setStoryTitle] = useState("");
  const [selectedModel, setSelectedModel] = useState("PALM");
  const [temperature, setTemperature] = useState("Creative");

  useEffect(() => {
      if(storyData?.id){
        setCreatePage(1)
      }
  }, [])
  
  return (
    <div className={styles.createRootCont}>
      {createPage === 0 ? (
        <>
          <PageOne
            setPageFlag={setPageFlag}
            setCreatePage={setCreatePage}
            storyTitle={storyTitle}
            setStoryTitle={setStoryTitle}
            selectedModel={selectedModel}
            setSelectedModel={setSelectedModel}
            temperature={temperature}
            setTemperature={setTemperature}
          />
        </>
      ) : (
        <>
          <PageTwo setPageFlag={setPageFlag} />
        </>
      )}
    </div>
  );
};

export default Create;
