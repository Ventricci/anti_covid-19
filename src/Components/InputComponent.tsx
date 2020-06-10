/** @jsx jsx */
import "typeface-mako";
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { InputHTMLAttributes, DetailedHTMLProps } from "react";

interface Props
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  name?: string;
}

const search = require("../Images/search.png");

const InputContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 40px;
`;

const StyledInput = styled.input`
  box-sizing: border-box;
  width: 100%;
  height: 40px;

  padding: 5px 40px 5px 10px;
  font-family: Mako;
  font-size: 16px;

  border: none;
  border-radius: 15px;
  box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.15);
`;

const StyledImage = styled.img`
  width: 25px;
  height: 25px;
  margin-left: -35px;
`;

export default function InputComponent(props: Props) {
  return (
    <InputContainer>
      <StyledInput {...props} />
      <StyledImage src={search} />
    </InputContainer>
  );
}
