/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { useLocation, useHistory } from "react-router-dom";

interface Props {
  state: string;
  deaths: number;
  confirmed: number;
}

const CardBox = styled(motion.div)`
  box-sizing: border-box;
  width: 100%;
  height: 80px;
  margin: 10px 0px 10px 0px;

  display: flex;
  flex-direction: row;

  border-radius: 20px;
  padding: 5px;
  background-color: #ffffff;
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

  opacity: 0.5;
`;

const CardBody = styled(motion.div)`
  box-sizing: border-box;
  width: 70%;
  height: 100%;

  display: flex;
  flex-direction: column;
  padding: 5px;

  border-left: 2px solid rgb(135, 206, 235, 0.5);
`;

const CardContent = styled.span`
  flex: 1;
  display: inline-flex;
  align-items: center;

  @media (min-width: 400px) {
    font-size: 16px;
    line-height: 16px;
  }
  @media (max-width: 400px) {
    font-size: 14px;
    line-height: 14px;
  }
  @media (max-width: 360px) {
    font-size: 12px;
    line-height: 12px;
  }

  padding: 0px;
`;

export default function StateCard(props: Props) {
  let history = useHistory();

  return (
    <CardBox
      whileTap={{
        scale: 0.95,
        transitionEnd: { boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.20)" },
      }}
      onClick={() => history.push("/city", { state: props.state })}
    >
      <CardImage>
        <span
          css={css`
            font-size: 50px;
          `}
        >
          {props.state}
        </span>
      </CardImage>
      <CardBody>
        <CardContent>
          Casos de óbitos: {props.deaths.toLocaleString("pt-BR")}
        </CardContent>
        <CardContent>
          Casos confirmados: {props.confirmed.toLocaleString("pt-BR")}
        </CardContent>
      </CardBody>
    </CardBox>
  );
}
