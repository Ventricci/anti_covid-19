/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import HomeCard from "../Components/HomeCard";
import { URL_API } from "../Config/GlobalVariables";

interface Cases {
  deaths: number;
  confirmed: number;
  epicenterConfirmed: number;
  epicenterState: string;
}

const Container = styled(motion.div)`
  box-sizing: border-box;
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px 30px 100px 30px;

  overflow-y: scroll;
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

async function getCases(setCases: any) {
  let response = await fetch(
    `${URL_API}/caso/data?is_last=True&place_type=state`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
  if (response.status == 200) {
    let responseObject = await response.json();
    console.log(responseObject);
    let totalDeaths = 0;
    let totalConfirmed = 0;
    let epicenterState = "";
    let epicenterConfirmed = 0;
    responseObject.results.map((state: any) => {
      totalDeaths += state.deaths;
      totalConfirmed += state.confirmed;
      if (state.confirmed >= epicenterConfirmed) {
        epicenterConfirmed = state.confirmed;
        epicenterState = state.state;
      }
    });
    setCases({
      deaths: totalDeaths,
      confirmed: totalConfirmed,
      epicenterConfirmed: epicenterConfirmed,
      epicenterState: epicenterState,
    });
  } else {
    console.log(response.status);
  }
}

export default function HomeScreen() {
  let [cases, setCases] = useState<Cases>({
    deaths: 0,
    confirmed: 0,
    epicenterConfirmed: 0,
    epicenterState: "",
  });

  useEffect(() => {
    getCases(setCases);
  }, []);

  useEffect(() => {
    console.log(cases);
  }, [cases]);

  return (
    <Container>
      <TitleBox>
        <Title>{"COVID-19 Brasil"}</Title>
        <Title>{new Date().toLocaleDateString("pt-BR")}</Title>
      </TitleBox>
      <HomeCard
        type={"deaths"}
        val={cases.deaths}
        description={"Casos de óbito"}
      />
      <HomeCard
        type={"confirmed"}
        val={cases.confirmed}
        description={"Casos confirmados"}
      />
      <HomeCard
        type={"epicenter"}
        val={cases.epicenterConfirmed}
        description={"Epicentro brasileiro"}
        state={cases.epicenterState}
      />
    </Container>
  );
}
