import React, { useState, useEffect } from "react";
import { Box, Container, Typography } from "@mui/material";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import QuestionCategory from "../QuestionBlock/QuestionCategory";
import demoQuestions from "../../DemoQuestions.json";

const CO2QuestionsDataFetcher = () => {
  const [questions, setQuestions] = useState(demoQuestions);

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await fetch("/questions");
      const data = await response.json();
      setQuestions(data);
    };

    fetchQuestions();
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Container sx={{ flex: 1 }}>
        {questions ? (
          <QuestionCategory category={questions.category}></QuestionCategory>
        ) : (
          <Typography>
            Fehler beim Laden der Fragen. Bitte versuchen sie es später erneut.
          </Typography>
        )}
      </Container>
      <Footer />
    </Box>
  );
};

export default CO2QuestionsDataFetcher;