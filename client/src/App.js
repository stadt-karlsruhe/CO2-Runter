import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import LandingPage from "./components/Landingpage/Landingpage";
import Impressum from "./components/Impressum/Impressum";
import DataPrivacy from "./components/DataPrivacy/DataPrivacy";
import CO2QuestionsDataFetcher from "./components/QuestionBlock/CO2QuestionsDataFetcher";
import InformationPage from "./components/Information/InformationPage";
import Login from "./components/Login/LoginRegister"
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
          <Route path="/information" element={<InformationPage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
