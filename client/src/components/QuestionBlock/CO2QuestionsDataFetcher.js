import React, { useState, useEffect } from "react";
import { Box, Container, Typography } from "@mui/material";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import QuestionCategory from "../QuestionBlock/QuestionCategory";
import axios from 'axios';
import CheckAuth from "../CheckAuth";

import { addItem, updateItem, setLoading } from '../../features/Store';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';


const CO2QuestionsDataFetcher = () => {
  const [questions, setQuestions] = useState("");
  const isLoggedIn = CheckAuth();

  const dispatch = useDispatch();

  const storeCats = useSelector(state => state.categories); // Replace 'categories' with your state slice name
  const categories = storeCats.categories
  console.log("cats on load:", categories)

  const loading = useSelector(state => state.categories.loading);
  console.log("Loading:",loading)

  useEffect(() => {
    const fetchQuestions = async () => {
      if (loading) return
      try {
        dispatch(setLoading(true))
        const response = await axios.get('/api/questions');
        const data = response.data;
        localStorage.setItem("CO2questions", JSON.stringify(data));
        setQuestions(data);
        console.log(data,data.category[0].questions[0].quick.defaultValue)
        // initialize store
        data.category.forEach((cval,cat)=> {
          console.log(cval)
          cval.questions.forEach((qval,q) => {
            console.log("item:",cat,q,qval.quick.defaultValue)
            dispatch(addItem({ category: cat, value: qval.quick.defaultValue }));
          })
        })
        //const categories = storeCats.categories
        //console.log("cats: ",categories)
      
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