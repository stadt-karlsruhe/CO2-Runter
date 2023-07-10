import React, { useState, useEffect } from "react";
import { Box, Container, Typography } from "@mui/material";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import QuestionCategory from "../QuestionBlock/QuestionCategory";
import axios from 'axios';
import CheckAuth from "../CheckAuth";

const CO2QuestionsDataFetcher = () => {
  const [questions, setQuestions] = useState("");
  const isLoggedIn = CheckAuth();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('/api/questions');
        const data = response.data;
        localStorage.setItem("CO2questions", JSON.stringify(data));
        setQuestions(data);
      } catch (error) {
        console.log("Fragen nicht gefunden!")
      }
    };
  
    fetchQuestions();
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const groupCode = urlParams.get("groupcode");
    if (groupCode) {
      localStorage.setItem("groupCode", groupCode);
    }
    if(isLoggedIn){
      addUserToGroup(groupCode);
    }
  }, []);

  const addUserToGroup = async (groupCode) => {
    const co2Token = localStorage.getItem("CO2Token");
    try {
      await axios.post(`/api/groups/add_user`,{
          co2token: co2Token,
          groupcode: groupCode
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Container sx={{ flex: 1 }}>
        {questions ? (
          <QuestionCategory category={questions.category}></QuestionCategory>
        ) : (
          <Typography>
            Fehler beim Laden der Fragen. Bitte versuchen Sie es später erneut.
          </Typography>
        )}
      </Container>
      <Footer />
    </Box>
  );
};

export default CO2QuestionsDataFetcher;