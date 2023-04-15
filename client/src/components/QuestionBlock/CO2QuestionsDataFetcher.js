import React, { useState, useEffect } from "react";

const CO2QuestionsDataFetcher = () => {
  const [questions, setQuestions] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await fetch("/questions");
      const data = await response.json();
      setQuestions(data);
    };

    fetchQuestions();
  }, []);

  // Render the questions data or a loading message
  return (
    <div>
      {questions ? (
        // Render the questions data here
        <div> Render the questions data </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default CO2QuestionsDataFetcher;
