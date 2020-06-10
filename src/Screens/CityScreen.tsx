/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { motion } from "framer-motion";
import { URL_API } from "../Config/GlobalVariables";
import { useLocation } from "react-router-dom";
import styled from "@emotion/styled";
import InputComponent from "../Components/InputComponent";
import CityCard from "../Components/CityCard";
import { useEffect, useState } from "react";

interface Scenario {
  totalDeaths: number;
  newDeaths: number;
  totalConfirmed: number;
  newConfirmed: number;
  date: string;
}

const loadingIcon = require("../Images/loading.png");

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

const Error = styled.span`
  padding: 0px;
  margin: 10% 0px 0px 0px;
  font-size: 20px;
  line-height: 20px;
  text-align: justify;
`;

async function getCityCases(
  city: string,
  state: string,
  setScenario: Function,
  setError: Function,
  setLoading: Function
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
  if (response.status === 200) {
    let responseObject = await response.json();
    if (responseObject.results.length > 0) {
      console.log(responseObject.results);
      let scenario = responseObject.results[0];
      console.log(scenario.date);
      setLoading(false);
      setScenario({
        totalDeaths: scenario.last_available_deaths,
        newDeaths: scenario.new_deaths,
        totalConfirmed: scenario.last_available_confirmed,
        newConfirmed: scenario.new_confirmed,
        date: scenario.date,
      });
      setError({ status: false, message: "" });
    } else {
      setLoading(false);
      setError({
        status: true,
        message:
          "Não existem informações sobre a cidade informada. Verifique se o nome da mesma foi inserida corretamente ou se o governo local tem disponibilizado os número de casos à Secretaria de Saúde de seu Estado e cobre os governantes responsáveis.",
      });
    }
  } else {
    setLoading(false);
    setError({
      status: true,
      message:
        "Houve um erro ao tentar recuperar os dados. Verifique sua conexão com a Internet e tente novamente.",
    });
  }
}

export default function CityScreen() {
  let location = useLocation<{ state: string }>();
  let [error, setError] = useState({ status: false, message: "" });
  let [visible, setVisible] = useState(false);
  let [loading, setLoading] = useState(false);
  let [search, setSearch] = useState("");
  let [scenario, setScenario] = useState<Scenario>({
    totalDeaths: 0,
    newDeaths: 0,
    totalConfirmed: 0,
    newConfirmed: 0,
    date: "",
  });

  useEffect(() => {
    if (scenario.date !== "") {
      setVisible(true);
    } else {
      setVisible(false);
    }
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
          setVisible(false);
          setError({ status: false, message: "" });
        }}
        onKeyPressCapture={(e) => {
          if (e.key === "Enter") {
            setLoading(true);
            setTimeout(() => {
              getCityCases(
                search,
                location.state.state,
                setScenario,
                setError,
                setLoading
              );
            }, 1000);
          }
        }}
      />
      {loading ? (
        <motion.img
          animate={{ rotate: 360 }}
          transition={{ loop: Infinity, duration: 1, ease: "linear" }}
          src={loadingIcon}
          css={css`
            margin-top: 30%;
            width: 50px;
            height: 50px;
          `}
        />
      ) : null}
      {error.status ? (
        <Error>{error.message}</Error>
      ) : (
        <CityCard
          city={search}
          state={location.state.state}
          deaths={scenario.totalDeaths}
          newDeaths={scenario.newDeaths}
          confirmed={scenario.totalConfirmed}
          newConfirmed={scenario.newConfirmed}
          date={scenario.date.replace(/-/g, '\/')}
          render={visible}
        />
      )}
    </Container>
  );
}
