/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import styled from "@emotion/styled";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface Props {
  title: string;
  content: string;
}
const CardContainer = styled.div`
  box-sizing: border-box;
  padding: 0% 5% 0% 5%;

  display: flex;
  flex-shrink: 0;

  width: 90%;
  height: 90%;
`;

const CardBox = styled.div`
  box-sizing: border-box;
  padding: 10px;

  display: flex;
  flex-direction: column;
  flex-shrink: 0;

  width: 100%;
  height: 100%;

  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.15);
`;

const CardHeader = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: auto;

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
  color: #87ceeb;
`;

const CardContent = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
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
  let location = useLocation();

  return (
    <CardContainer>
      <CardBox>
        <CardHeader>{props.title}</CardHeader>
        <CardContent>{props.content}</CardContent>
      </CardBox>
    </CardContainer>
  );
}
