/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import HomeCard from "../Components/HomeCard";
import { URL_API } from "../Config/GlobalVariables";
import { useLocation } from "react-router-dom";

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

const pageVariants: Variants = {
  in: {
    x: 0,
  },
  questionOut: {
    x: "200vw",
  },
  stateOut: {
    x: "-100vw",
  },
  out: {
    y: "200vh",
  },
};

async function getCases(setCases: Function) {
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
  let location = useLocation<{ prevLocation: string }>();
  let [cases, setCases] = useState<Cases>({
    deaths: 0,
    confirmed: 0,
    epicenterConfirmed: 0,
    epicenterState: "",
  });

  useEffect(() => {
    getCases(setCases);
  }, []);

  return (
    <Container
      initial={
        location.state.prevLocation == "/question" ? "questionOut" : "stateOut"
      }
      animate={"in"}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.75 }}
      variants={pageVariants}
    >
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
