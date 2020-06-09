/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import styled from "@emotion/styled";
import { AnimatePresence, motion } from "framer-motion";

const Container = styled(motion.div)`
  box-sizing: border-box;
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px 30px 100px 30px;

  overflow-y: scroll;
  overflow-x: hidden;
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
      transition={{ duration: 0.75 }}
    >
      <TitleBox>
        <Title>{"Dúvidas sobre"}</Title>
        <Title>COVID-19 e o APP</Title>
      </TitleBox>
    </Container>
  );
}
