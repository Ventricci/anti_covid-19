/** @jsx jsx */
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { useState } from "react";

interface Props {
  title: string;
  content: string;
}
const CardContainer = styled(motion.div)`
  box-sizing: border-box;

  display: flex;
  flex-shrink: 0;

  width: 100%;
  margin: 0 0 20px 0;
`;

const CardBox = styled.div`
  box-sizing: border-box;
  padding: 10px;

  display: flex;
  flex-direction: column;
  flex-shrink: 0;

  width: 100%;

  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.15);
`;

const CardHeader = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 5px;

  @media (min-width: 400px) {
    font-size: 18px;
  }
  @media (max-width: 400px) {
    font-size: 16px;
  }
  @media (max-width: 360px) {
    font-size: 14px;
  }
  @media (max-width: 320px) {
    font-size: 12px;
  }

  text-align: justify;
  font-weight: bold;
  text-align: justify;
  color: #1b425d;
`;

const CardContent = styled(motion.div)`
  box-sizing: border-box;
  width: 100%;

  overflow: hidden;
  padding: 5px;

  @media (min-width: 400px) {
    font-size: 16px;
  }
  @media (max-width: 400px) {
    font-size: 14px;
  }
  @media (max-width: 360px) {
    font-size: 12px;
  }
  @media (max-width: 320px) {
    font-size: 10px;
  }

  text-align: justify;
`;

export default function QuestionCard(props: Props) {
  let [visible, setVisible] = useState(false);

  return (
    <CardContainer
      onClick={() => {
        if (visible) {
          setVisible(false);
        } else {
          setVisible(true);
        }
      }}
      whileTap={{ scale: 0.95 }}
    >
      <CardBox>
        <CardHeader>{props.title}</CardHeader>
        <CardContent
          animate={
            visible
              ? { height: "auto", padding: "5px" }
              : { height: 0, padding: 0 }
          }
          transition={{ stiffness: 10 }}
        >
          {props.content}
        </CardContent>
      </CardBox>
    </CardContainer>
  );
}
