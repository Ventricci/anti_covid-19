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
  padding: 0% 10% 0% 10%;

  display: flex;
  flex-shrink: 0;

  width: 80vw;
  height: 80%;
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
  border: 2px solid #87ceeb;
  box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.25);
`;

const CardTitle = styled.div``;

const CardContent = styled.div``;

export default function QuestionCard(props: Props) {
  let location = useLocation();

  return (
    <CardContainer>
      <CardBox></CardBox>
    </CardContainer>
  );
}
