/** @jsx jsx */
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import StateCard from "../Components/StateCard";
import { URL_API } from "../Config/GlobalVariables";

interface Cases {
  state: string;
  deaths: number;
  confirmed: number;
}

const Container = styled(motion.div)`
  box-sizing: border-box;
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px 30px 100px 30px;

  overflow-x: hidden;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
  ::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }
`;

const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  width: 100%;
  margin: 15px 0px 15px 0px;
`;

const Title = styled.span`
  padding: 0px;
  margin: 10px 0px 10px 0px;
  line-height: 24px;
  text-align: right;
  font-size: 24px;
`;

async function getCases(cases: Cases[], setCases: Function) {
  let response = await fetch(
    `${URL_API}/caso/data?is_last=True&place_type=state`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
  if (response.status === 200) {
    let responseObject = await response.json();
    setCases(responseObject.results);
  } else {
    console.log(response.status);
  }
}

function compare(a: Cases, b: Cases) {
  let result = 0;
  if (a.state > b.state) {
    result = 1;
  } else if (a.state < b.state) {
    result = -1;
  }
  return result;
}

export default function StateScreen() {
  let [cases, setCases] = useState<Cases[]>([]);

  if (cases !== undefined) {
    cases.sort(compare);
  }

  useEffect(() => {
    getCases(cases, setCases);
  }, []);

  return (
    <Container
      initial={{ opacity: 0, x: "200vw" }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <TitleBox>
        <Title>{"COVID-19 por estado"}</Title>
        <Title>{new Date().toLocaleDateString("pt-BR")}</Title>
      </TitleBox>
      {cases.map((stateCases: Cases, index: number) => {
        return (
          <StateCard
            key={index}
            state={stateCases.state}
            deaths={stateCases.deaths}
            confirmed={stateCases.confirmed}
          />
        );
      })}
    </Container>
  );
}
