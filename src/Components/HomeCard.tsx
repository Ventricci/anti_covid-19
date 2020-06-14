/** @jsx jsx */
import "typeface-mako";
import { jsx, css } from "@emotion/core";
import styled from "@emotion/styled";
import { motion } from "framer-motion";

const deaths = require("../Images/dead.png");
const coronaVirus = require("../Images/corona_virus.png");

interface Props {
  type: string;
  val: number;
  description: string;
  state?: string;
}

const CardBox = styled(motion.div)`
  width: 100%;
  height: 100px;
  margin: 10px 0px 10px 0px;

  display: flex;
  flex-direction: row;

  border-radius: 20px;
  padding: 5px;
  color: #ffffff;
  font-family: Mako;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.25);
`;

const CardImage = styled(motion.div)`
  box-sizing: border-box;
  width: 30%;
  height: 100%;

  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  justify-items: center;

  opacity: 0.75;
`;

const CardBody = styled(motion.div)`
  box-sizing: border-box;
  width: 70%;
  height: 100%;

  display: flex;
  flex-direction: column;
  padding: 5px;

  border-left: 2px solid rgb(255, 255, 255, 0.5);
`;

const CardValue = styled.span`
  flex: 1;
  display: inline-flex;
  align-items: flex-start;

  padding: 0px;

  @media (max-width: 768px) {
    font-size: 50px;
    line-height: 50px;
  }
  @media (max-width: 320px) {
    font-size: 42px;
    line-height: 42px;
  }
  font-weight: bold;
`;

const CardDescription = styled.span`
  flex: 1;
  display: inline-flex;
  align-items: center;
  padding: 0px;
  margin: 0px;
  @media (max-width: 768px) {
    font-size: 20px;
  }
  @media (max-width: 320px) {
    font-size: 16px;
  }
`;

export default function HomeCard(props: Props) {
  return (
    <CardBox
      css={css`
        background-color: ${props.type === "deaths"
          ? `#b22222`
          : props.type === "confirmed"
          ? `#ff8300`
          : `#d1a987`};
      `}
    >
      <CardImage>
        {props.state === undefined ? (
          <img
            src={props.type === "deaths" ? deaths : coronaVirus}
            alt=""
            css={css`
              width: 75%;
              height: 75%;
              padding: 0;
            `}
          />
        ) : (
          <span
            css={css`
              font-size: 60px;
            `}
          >
            {props.state}
          </span>
        )}
      </CardImage>
      <CardBody>
        <CardValue>{props.val?.toLocaleString("pt-BR")}</CardValue>
        <CardDescription>{props.description}</CardDescription>
      </CardBody>
    </CardBox>
  );
}
