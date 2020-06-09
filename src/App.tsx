/** @jsx jsx */
import "typeface-mako";
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";
import { jsx, css } from "@emotion/core";
import styled from "@emotion/styled";
import { motion, AnimatePresence } from "framer-motion";
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
        <Route
          render={({ location }) => {
            return (
              <AnimatePresence exitBeforeEnter>
                <Switch location={location} key={location.pathname}>
                  <Route path="/state" component={StateScreen} />
                  <Route path="/city" component={CityScreen} />
                  <Route path="/question" component={QuestionScreen} />
                  <Route path="/" component={HomeScreen} />
                </Switch>
              </AnimatePresence>
            );
          }}
        />
        <Footer />
      </Router>
    </Root>
  );
}
