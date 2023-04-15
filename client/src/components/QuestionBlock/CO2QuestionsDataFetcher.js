import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import questionDemo from "../../questions_NotPUSH.json";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import QuestionCategory from "../QuestionBlock/QuestionCategory";

const CO2QuestionsDataFetcher = () => {
  const [questions, setQuestions] = useState(questionDemo); //questionDemo durch null ersetzen, wenn mit Backend testen möchte

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await fetch("/questions");
      const data = await response.json();
      setQuestions(data);
    };

    fetchQuestions();
  }, []);

  return (
    <div>
      {questions ? (
        <>
          <Header />
          <QuestionCategory category={questionDemo.category}></QuestionCategory>
          <Footer />
        </>
      ) : (
        <>
          <Header />
          <Typography>
            Fehler beim Laden der Fragen. Bitte versuchen sie es später erneut.
          </Typography>
          <Footer />
        </>
      )}
    </div>
  );
};

export default CO2QuestionsDataFetcher;
