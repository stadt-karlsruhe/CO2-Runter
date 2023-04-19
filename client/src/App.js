import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import LandingPage from "./components/Landingpage/Landingpage";
import Impressum from "./components/Impressum/Impressum";
import DataPrivacy from "./components/DataPrivacy/DataPrivacy";
import CO2QuestionsDataFetcher from "./components/QuestionBlock/CO2QuestionsDataFetcher";
import theme from "./styles/theme.js";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/CO2Rechner" element={<CO2QuestionsDataFetcher />} />
          <Route path="/Dashboard" element={<LandingPage />} />
          <Route path="/datenschutz" element={<DataPrivacy />} />
          <Route path="/impressum" element={<Impressum />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
