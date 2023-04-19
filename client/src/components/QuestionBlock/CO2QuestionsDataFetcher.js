import React, { useState, useEffect } from "react";
import { Box, Container, Typography } from "@mui/material";
import questionDemo from "../../questions_NotPUSH.json";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import QuestionCategory from "../QuestionBlock/QuestionCategory";

const CO2QuestionsDataFetcher = () => {
  const [questions, setQuestions] = useState(questionDemo);

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
          <QuestionCategory category={questionDemo.category}></QuestionCategory>
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