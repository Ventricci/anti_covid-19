/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import styled from "@emotion/styled";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const logo = require("../Images/logo.png");

const HeaderBox = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 85px;

  position: absolute;
  top: 0;
  padding: 15px 30px 15px 30px;

  background-color: #ffffff;
  font-size: 30px;
  font-weight: normal;
  color: #87ceeb;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  z-index: 1;
`;

const HeaderTitle = styled.div`
  display: flex;
  flex: 3;

  align-items: center;
  justify-items: center;

  font-family: Mako;
`;

const HeaderLogo = styled.div`
  display: flex;
  flex: 1;

  align-items: center;
  justify-content: flex-end;
`;

export default function Header() {
  let location = useLocation();

  return (
    <HeaderBox>
      <HeaderTitle>Anti COVID-19</HeaderTitle>
      <HeaderLogo>
        <img
          src={logo}
          css={css`
            width: 50px;
            height: 50px;
          `}
        />
      </HeaderLogo>
    </HeaderBox>
  );
}
