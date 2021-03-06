/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import styled from "@emotion/styled";

const logo = require("../Images/logo.png");

const HeaderBox = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 80px;

  z-index: 1;
  display: flex;
  flex-direction: row;

  position: absolute;
  top: 0;
  padding: 15px 30px 15px 30px;
  justify-content: space-between;

  background-color: #ffffff;
  box-shadow: 0px -10px 25px rgba(0, 0, 0, 0.25);
  font-size: 30px;
  font-weight: normal;
  color: #1b425d;
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
  return (
    <HeaderBox>
      <HeaderTitle>Anti COVID-19</HeaderTitle>
      <HeaderLogo>
        <img
          src={logo}
          alt=""
          css={css`
            width: 50px;
            height: 50px;
          `}
        />
      </HeaderLogo>
    </HeaderBox>
  );
}
