/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { motion } from "framer-motion";
import { URL_API } from "../Config/GlobalVariables";
import { useLocation } from "react-router-dom";
import styled from "@emotion/styled";
import InputComponent from "../Components/InputComponent";
import CityCard from "../Components/CityCard";
import { useEffect, useState } from "react";
import { Plugins } from "@capacitor/core";

interface Scenario {
  cityName: string;
  totalDeaths: number;
  newDeaths: number;
  totalConfirmed: number;
  newConfirmed: number;
  date: string;
}

const { Keyboard } = Plugins;

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
      let scenario = responseObject.results[0];
      setLoading(false);
      setScenario({
        cityName: scenario.city,
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

function capitalize(text: string) {
  text = text.toLowerCase().replace(/(?:^|\s)\S/g, function (capitalize) {
    return capitalize.toUpperCase();
  });
  //preposição digitada
  var PreposM = ["Da", "Do", "Das", "Dos", "A", "E", "De", "DE"];
  //preposição substituta
  var prepos = ["da", "do", "das", "dos", "a", "e", "de", "de"];

  for (var i = PreposM.length - 1; i >= 0; i--) {
    text = text.replace(
      RegExp(
        "\\b" + PreposM[i].replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&") + "\\b",
        "g"
      ),
      prepos[i]
    );
  }

  return text;
}

export default function CityScreen() {
  let location = useLocation<{ state: string }>();
  let [error, setError] = useState({ status: false, message: "" });
  let [visible, setVisible] = useState(false);
  let [loading, setLoading] = useState(false);
  let [search, setSearch] = useState("");
  let [scenario, setScenario] = useState<Scenario>({
    cityName: "",
    totalDeaths: 0,
    newDeaths: 0,
    totalConfirmed: 0,
    newConfirmed: 0,
    date: "",
  });

  useEffect(() => {
    setLoading(true);
    switch (location.state.state) {
      case "AC":
        getCityCases(
          "Rio Branco",
          location.state.state,
          setScenario,
          setError,
          setLoading
        );
        break;
      case "AL":
        getCityCases(
          "Maceió",
          location.state.state,
          setScenario,
          setError,
          setLoading
        );
        break;
      case "AP":
        getCityCases(
          "Macapá",
          location.state.state,
          setScenario,
          setError,
          setLoading
        );
        break;
      case "AM":
        getCityCases(
          "Manaus",
          location.state.state,
          setScenario,
          setError,
          setLoading
        );
        break;
      case "BA":
        getCityCases(
          "Salvador",
          location.state.state,
          setScenario,
          setError,
          setLoading
        );
        break;
      case "CE":
        getCityCases(
          "Fortaleza",
          location.state.state,
          setScenario,
          setError,
          setLoading
        );
        break;
      case "DF":
        getCityCases(
          "Brasília",
          location.state.state,
          setScenario,
          setError,
          setLoading
        );
        break;
      case "ES":
        getCityCases(
          "Vitória",
          location.state.state,
          setScenario,
          setError,
          setLoading
        );
        break;
      case "GO":
        getCityCases(
          "Goiânia",
          location.state.state,
          setScenario,
          setError,
          setLoading
        );
        break;
      case "MA":
        getCityCases(
          "São Luís",
          location.state.state,
          setScenario,
          setError,
          setLoading
        );
        break;

      case "MT":
        getCityCases(
          "Cuiabá",
          location.state.state,
          setScenario,
          setError,
          setLoading
        );
        break;
      case "MS":
        getCityCases(
          "Campo Grande",
          location.state.state,
          setScenario,
          setError,
          setLoading
        );
        break;
      case "MG":
        getCityCases(
          "Belo Horizonte",
          location.state.state,
          setScenario,
          setError,
          setLoading
        );
        break;
      case "MS":
        getCityCases(
          "Campo Grande",
          location.state.state,
          setScenario,
          setError,
          setLoading
        );
        break;
      case "PA":
        getCityCases(
          "Belém",
          location.state.state,
          setScenario,
          setError,
          setLoading
        );
        break;
      case "PB":
        getCityCases(
          "João Pessoa",
          location.state.state,
          setScenario,
          setError,
          setLoading
        );
        break;
      case "PR":
        getCityCases(
          "Curitiba",
          location.state.state,
          setScenario,
          setError,
          setLoading
        );
        break;
      case "PE":
        getCityCases(
          "Recife",
          location.state.state,
          setScenario,
          setError,
          setLoading
        );
        break;
      case "PI":
        getCityCases(
          "Teresina",
          location.state.state,
          setScenario,
          setError,
          setLoading
        );
        break;
      case "RJ":
        getCityCases(
          "Rio de Janeiro",
          location.state.state,
          setScenario,
          setError,
          setLoading
        );
        break;
      case "RN":
        getCityCases(
          "Natal",
          location.state.state,
          setScenario,
          setError,
          setLoading
        );
        break;
      case "RS":
        getCityCases(
          "Porto Alegre",
          location.state.state,
          setScenario,
          setError,
          setLoading
        );
        break;
      case "RO":
        getCityCases(
          "Porto Velho",
          location.state.state,
          setScenario,
          setError,
          setLoading
        );
        break;
      case "RR":
        getCityCases(
          "Boa Vista",
          location.state.state,
          setScenario,
          setError,
          setLoading
        );
        break;
      case "SC":
        getCityCases(
          "Florianópolis",
          location.state.state,
          setScenario,
          setError,
          setLoading
        );
        break;
      case "SP":
        getCityCases(
          "São Paulo",
          location.state.state,
          setScenario,
          setError,
          setLoading
        );
        break;
      case "SE":
        getCityCases(
          "Aracaju",
          location.state.state,
          setScenario,
          setError,
          setLoading
        );
        break;
      case "TO":
        getCityCases(
          "Palmas",
          location.state.state,
          setScenario,
          setError,
          setLoading
        );
        break;
    }
  }, []);

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
        <Title>Casos por cidade</Title>
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
          if (e.key === "Enter" && search !== "") {
            Keyboard.hide();
            setVisible(false);
            setError({ status: false, message: "" });
            setLoading(true);
            search = capitalize(search);
            setTimeout(() => {
              getCityCases(
                search,
                location.state.state,
                setScenario,
                setError,
                setLoading
              );
            }, 1000);
          } else {
            setVisible(false);
            setError({
              status: true,
              message: "Entre com o nome de uma cidade.",
            });
          }
        }}
        onSearchClick={() => {
          if (search !== "") {
            Keyboard.hide();
            setVisible(false);
            setError({ status: false, message: "" });
            setLoading(true);
            search = capitalize(search);
            setTimeout(() => {
              getCityCases(
                search,
                location.state.state,
                setScenario,
                setError,
                setLoading
              );
            }, 1000);
          } else {
            setVisible(false);
            setError({
              status: true,
              message: "Entre com o nome de uma cidade.",
            });
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
          city={scenario.cityName}
          state={location.state.state}
          deaths={scenario.totalDeaths}
          newDeaths={scenario.newDeaths}
          confirmed={scenario.totalConfirmed}
          newConfirmed={scenario.newConfirmed}
          date={scenario.date.replace(/-/g, "/")}
          render={visible}
        />
      )}
    </Container>
  );
}
