/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import styled from "@emotion/styled";
import { motion, Variants } from "framer-motion";
import { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";

const home = require("../Images/home.png");
const question = require("../Images/question.png");
const brazil = require("../Images/brazil.png");

const FooterBox = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100px;

  position: absolute;
  bottom: -15px;
  padding: 15px;

  background-color: #ffffff;
  box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.25);
  border-radius: 20px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const FooterButton = styled(motion.div)`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 15px;
  font-size: 12px;
`;

const active: Variants = {
  opend: {
    opacity: 1,
  },
  closed: {
    opacity: 0.35,
  },
};

export default function Footer() {
  let location = useLocation();
  let history = useHistory();
  let [selected, setSelected] = useState<"home" | "question" | "state">("home");

  useEffect(() => {
    if (location.pathname === "/question") {
      setSelected("question");
    } else if (location.pathname === "/state") {
      setSelected("state");
    } else if (location.pathname === "/") {
      setSelected("home");
    }
  }, [location.pathname]);

  return (
    <FooterBox>
      <FooterButton
        animate={selected === "question" ? "opend" : "closed"}
        variants={active}
        onClick={() => {
          history.replace("/question");
        }}
      >
        <img
          src={question}
          alt=""
          css={css`
            width: 30px;
            height: 30px;
            padding-bottom: 5px;
          `}
        />
        dúvidas
      </FooterButton>
      <FooterButton
        animate={selected === "home" ? "opend" : "closed"}
        variants={active}
        onClick={() => {
          history.replace("/", { prevLocation: location.pathname });
        }}
      >
        <img
          src={home}
          alt=""
          css={css`
            width: 30px;
            height: 30px;
            padding-bottom: 5px;
          `}
        />
        início
      </FooterButton>
      <FooterButton
        animate={selected === "state" ? "opend" : "closed"}
        variants={active}
        onClick={() => {
          history.replace("/state");
        }}
      >
        <img
          src={brazil}
          alt=""
          css={css`
            width: 30px;
            height: 30px;
            padding-bottom: 5px;
          `}
        />
        estados
      </FooterButton>
    </FooterBox>
  );
}
