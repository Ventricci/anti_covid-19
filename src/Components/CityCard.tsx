/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import styled from "@emotion/styled";
import { motion } from "framer-motion";

interface Props {
  city: string;
  state: string;
  deaths: number;
  newDeaths: number;
  confirmed: number;
  newConfirmed: number;
  date: string;
  render: Boolean;
}

const CardBox = styled(motion.div)`
  box-sizing: border-box;
  width: 100%;
  height: 300px;

  display: flex;
  flex-direction: column;
  flex-shrink: 0;

  border-radius: 20px;
  padding: 10px;
  margin-top: 10%;
  background-color: #ffffff;
  box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.15);
`;

const CardHeader = styled.div`
  width: 100%;
  height: 10%;

  padding-bottom: 15px;

  color: #87ceeb;
  font-size: 24px;
`;

const CardContent = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const CardFooter = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: flex-end;
  color: rgba(0, 0, 0, 0.5);
`;

const CardSpan = styled.span`
  font-size: 16px;
  margin-bottom: 5px;
`;

export default function CityCard(props: Props) {
  return (
    <CardBox
      initial={{ opacity: 0 }}
      animate={
        props.render ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }
      }
      transition={{ duration: 0.25 }}
    >
      <CardHeader>
        {props.city} - {props.state}
      </CardHeader>
      <CardContent>
        <CardSpan>
          Total de óbitos: {props.deaths.toLocaleString("pt-BR")}
        </CardSpan>
        <CardSpan>
          Novos óbitos: {props.newDeaths.toLocaleString("pt-BR")}
        </CardSpan>
        <CardSpan>
          Casos confirmados: {props.confirmed.toLocaleString("pt-BR")}
        </CardSpan>
        <CardSpan>
          Novos casos confirmados: {props.newConfirmed.toLocaleString("pt-BR")}
        </CardSpan>
        <CardSpan
          css={css`
            text-align: justify;
            padding-top: 15px;
          `}
        >
          * Novos óbitos e novos casos confirmados são contabilizados a partir
          do boletim publicado imediatamente anterior ao da data atual.
        </CardSpan>
      </CardContent>
      <CardFooter>
        {new Date(props.date).toLocaleDateString("pt-BR")}
      </CardFooter>
    </CardBox>
  );
}
