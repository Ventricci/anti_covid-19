/** @jsx jsx */
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import QuestionCard from "../Components/QuestionCard";

const Container = styled(motion.div)`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 100px 30px 100px 30px;

  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: visible;
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

export default function QuestionScreen() {
  return (
    <Container
      initial={{ opacity: 0, x: "-100vw" }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <TitleBox>
        <Title>Dúvidas sobre</Title>
        <Title>COVID-19 e o APP</Title>
      </TitleBox>
      <QuestionCard
        title={"Como são obtidos os dados disponibilizados pelo Anti COVID-19?"}
        content={
          "Os dados apresentados pelo aplicativo são retirados das Secretarias de Saúde das unidades federativas e tratados por Álvaro Justen e colaboradores da Brasil.IO."
        }
      />
      <QuestionCard
        title={
          "Os dados do Ministério da Saúde estão diferentes dos dados do aplicativo. Qual está correto?"
        }
        content={
          "Pode ser que a coleta dos dados pelos mantenedores da API que alimentam este aplicativo seja feita depois da coleta do Ministério da saúde e, com isso, torne os dados aqui disponibilizados mais atuais. Também pode acontecer o caso de a Secretaria Estadual informar ao Ministério da Saúde os dados antes de emitir um boletim público - nesse caso os dados aqui estarão desatualizados com relação ao ministério."
        }
      />
      <QuestionCard
        title={"Quais as recomendações de prevenção à COVID-19?"}
        content={
          "O Ministério da Saúde disponibiliza formas de se proteger em seu website: coronavius.saude.gov.br/sobre-a-doenca"
        }
      />
      <QuestionCard
        title={"Quais são os sintomas de COVID-19?"}
        content={
          "Os sintomas da COVID-19 podem variar de um simpes resfriado até uma pneumonia severa. Destacam-se dentre os sintomas mais comuns: tosse, febre, coriza, dor de garganta e dificuldade para respirar."
        }
      />
      <QuestionCard
        title={"Como é transmitida?"}
        content={
          "A transmissão acontece de uma pessoa doente para outra ou por contato próximo por meio de: aperto de mão, gotículas de saliva, espirro, tosse, catarro e objetos ou superfícies contamidas."
        }
      />
    </Container>
  );
}
