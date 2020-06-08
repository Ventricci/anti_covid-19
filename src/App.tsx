/** @jsx jsx */
import "typeface-mako";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { jsx, css } from "@emotion/core";
import styled from "@emotion/styled";
import CityScreen from "./Screens/CityScreen";
import HomeScreen from "./Screens/HomeScreen";
import QuestionScreen from "./Screens/QuestionScreen";
import StateScreen from "./Screens/StateScreen";
import Footer from "./Components/Footer";
import Header from "./Components/Header";

const Root = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;

  overflow: hidden;
  background-color: #f0f8ff;

  font-family: Mako;
`;

export default function App() {
  return (
    <Root>
      <Router>
        <Header />
        <Switch>
          <Route path="/state">
            <StateScreen />
          </Route>
          <Route path="/city">
            <CityScreen />
          </Route>
          <Route path="/question">
            <QuestionScreen />
          </Route>
          <Route path="/">
            <HomeScreen />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </Root>
  );
}
