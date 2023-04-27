import React, { useState, useEffect } from "react";
import { Box, Container, Typography } from "@mui/material";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import QuestionCategory from "../QuestionBlock/QuestionCategory";
import DemoQuestion from "../../DemoQuestion.json"
import axios from 'axios';

const CO2QuestionsDataFetcher = () => {
  const [questions, setQuestions] = useState("");

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('/api/questions');
        const data = response.data;
        setQuestions(data);
      } catch (error) {
        //Nur für übungszwecke
        setQuestions(DemoQuestion);
      }
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