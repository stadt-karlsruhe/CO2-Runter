import React, { useState } from "react";
import { Box, Container, useMediaQuery } from "@mui/material";
import CalculationSum from "./Calculation/CalculationSum";
import Questions from "./Questions";
import QuestionStepper from "./QuestionStepper";
import BottomStepper from "./BottomStepper";
import ChoiceScreen from "../DistrictGroupChoice/ChoiceScreen";

import { updateItem } from '../../features/Store';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const QuestionCategory = (props) => {
  const [finish, setFinish] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [isDetailed, setIsDetailed] = useState({});
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const [co2ValuesPerCategory, setCo2ValuesPerCategory] = useState(
    Array.from({ length: props.category.length }, () => [])
  );
  const [totalCo2, setTotalCo2] = useState(0);

  const dispatch = useDispatch();

  const storeCats = useSelector(state => state.categories); // Replace 'categories' with your state slice name
  const categories = storeCats.categories
  console.log("cats: ",categories)

  const delayedUpdate = (index, value) => {
    console.log("abcd:",index, value)
    setCo2ValuesPerCategory((prevValues) => {
      const newValues = [...prevValues];
      newValues[activeStep][index] = value;
      console.log("DBG - co2 change:",activeStep, index, value, prevValues,newValues )
      if (activeStep == 3)
        debugger
      
      return newValues;
    });
  }

  const handleCo2ValuesChange = (index, value) => {
    console.log("valuechange:",index, value,co2ValuesPerCategory)

    //store.dispatch(updateItem({ category: activeStep, index: index, value: value }));
    dispatch(updateItem({ category: activeStep, index: index, value: value }));
    //const categories = store.getState().categories.categories;
  
    //setTotalCo2(totalCo2 + 1)
    //setTimeout(setTotalCo2(totalCo2 + 1),1000)
    /*
    setCo2ValuesPerCategory((prevValues) => {
      const newValues = [...prevValues];
      newValues[activeStep][index] = value;
      console.log("DBG - co2 change:",activeStep, index, value, prevValues,newValues )
      if (activeStep == 3)
        debugger

      return newValues;
    });
    */
  };

  const getCategoryNames = () => {
    const names = props.category.map((category) => category.name);
    return names;
  };

  const handleStepChange = (step) => {
    console.log("Set active step:",step)
    setActiveStep(step);
  };

  const handleSwitchChange = (name) => {
    setIsDetailed((prevIsDetailed) => ({
      ...prevIsDetailed,
      [name]: !prevIsDetailed[name],
    }));
  };


  // const categories = useSelector((store) => store.categories);
  //const categories = store.getState().categories.categories;
  //console.log("cats: ",categories)

  // Calculate the summary based on your logic
  const summary = [
    categories[0].reduce((acc, val) => acc + val, 0),
    categories[1].reduce((acc, val) => acc + val, 0),
    categories[2].reduce((acc, val) => acc + val, 0),
    categories[3].reduce((acc, val) => acc + val, 0)
  ]
  console.log("sums: ",summary,summary.reduce((acc, val) => acc + val, 0))

  

  return (
    <Container maxWidth="lg">
      {!finish ? (
        <Box sx={{ my: 2, textAlign: "center" }}>
          <QuestionStepper
            activeStep={activeStep}
            category={props.category}
            onStepChange={handleStepChange}
            isSmallScreen={isSmallScreen}
          />
          <Questions
            key={activeStep}
            questions={props.category[activeStep].questions}
            isDetailed={isDetailed}
            onSwitchChange={handleSwitchChange}
            onCo2ValuesChange={handleCo2ValuesChange}
            rememberCategory={activeStep}
          />
          <CalculationSum
            values={co2ValuesPerCategory}
            totalCo2={totalCo2}
            setTotalCo2={setTotalCo2}
          />
          <BottomStepper
            activeStep={activeStep}
            category={props.category}
            onStepChange={handleStepChange}
            onFinish={setFinish}
          />
        </Box>
      ) : (
        <ChoiceScreen totalCo2={totalCo2} co2ValuesPerCategory={co2ValuesPerCategory} categories={getCategoryNames()} />
      )}
    </Container>
    
  );
};

export default QuestionCategory;
