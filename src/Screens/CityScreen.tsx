/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { URL_API } from "../Config/GlobalVariables";
import { useLocation } from "react-router-dom";
import styled from "@emotion/styled";
import InputComponent from "../Components/InputComponent";
import React, { useEffect, useState } from "react";

interface Scenario {
  totalDeaths: number;
  newDeaths: number;
  totalConfirmed: number;
  newCOnfirmed: number;
  date: string;
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

async function getCityCases(
  city: string,
  state: string,
  setScenario: Function
) {
  let response = await fetch(
    `${URL_API}/caso_full/data?state=${state}&city=${city}&is_last=True`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
  if (response.status == 200) {
    let responseObject = await response.json();
    if (responseObject.results.length > 0) {
      let scenario = responseObject.results[0];
      setScenario({
        totalDeaths: scenario.last_available_deaths,
        newDeaths: scenario.new_deaths,
        totalConfirmed: scenario.last_available_confirmed,
        newConfirmed: scenario.new_confirmed,
        date: scenario.date,
      });
    } else {
      console.log("Não encontrou");
    }
  } else {
    console.log(response.status);
  }
}

export default function CityScreen() {
  let location = useLocation<{ state: string }>();

  let [search, setSearch] = useState("");
  let [scenario, setScenario] = useState<Scenario>({
    totalDeaths: 0,
    newDeaths: 0,
    totalConfirmed: 0,
    newCOnfirmed: 0,
    date: "",
  });

  useEffect(() => {
    console.log(scenario);
  }, [scenario]);

  return (
    <Container
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <TitleBox>
        <Title>COVID-19 em {location.state.state}</Title>
        <Title>{new Date().toLocaleDateString("pt-BR")}</Title>
      </TitleBox>
      <InputComponent
        value={search}
        placeholder={"Digite o nome da cidade"}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        onKeyPressCapture={(e) => {
          if (e.key == "Enter") {
            getCityCases(search, location.state.state, setScenario);
          }
        }}
      />
    </Container>
  );
}
