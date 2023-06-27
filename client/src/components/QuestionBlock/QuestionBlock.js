import React, { useEffect, useState, useRef, useCallback } from "react";
import Switch from "@mui/material/Switch";
import Question from "./Question";
import {
  Box,
  Container,
  Divider,
  FormGroup,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

const QuestionBlock = (props) => {
  const defaultValues = props.questions.detailed.questions.map(
    (question) => question.defaultValue
  );
  const [co2Values, setCo2Values] = useState(defaultValues);
  const [inputValues, setInputValues] = useState([]);
  const co2InputRef = useRef(inputValues);
  const [quickInputReminder, setQuickInputReminder] = useState("");
  const [quickInputValue, setQuickInputValue] = useState(
    props.questions.quick.defaultValue
  );
  const { onCo2ValuesChange, isDetailed } = props;

  useEffect(() => {
    co2InputRef.current = co2Values;
  }, [co2Values, co2InputRef]);

  const handleSwitchChange = (event) => {
    props.onSwitchChange(event);
    setCo2Values(co2InputRef.current);
  };

  const handleQuick = (value, selectedValue) => {
    setQuickInputValue(value);
    setQuickInputReminder(selectedValue);
  };

  const calculateDetailedCo2 = useCallback(() => {
    const formulaString = props.questions.detailed.formula;
    const formula = eval(`(${formulaString})`);
    return formula(co2Values);
  }, [co2Values, props.questions.detailed.formula]);
  
  useEffect(() => {
    if (isDetailed) {
      onCo2ValuesChange(calculateDetailedCo2());
    } else {
      onCo2ValuesChange(quickInputValue);
    }
  }, [quickInputValue, calculateDetailedCo2, onCo2ValuesChange, isDetailed]);  

  const handleCo2ValuesChange = (index, value, inputValue) => {
    const newCo2Values = [...co2Values];
    newCo2Values[index] = value;
    setCo2Values(newCo2Values);
    const newInputValues = [...inputValues];
    newInputValues[index] = inputValue;
    setInputValues(newInputValues);
  };

  return (
    <Container maxWidth="sm">
      <Paper
        sx={{ my: 1, p: 2, backgroundColor: "#f7f9f5", borderRadius: "8px" }}
      >
        {isDetailed ? (
          props.questions.detailed.questions.map((question, index) => (
            <Box key={index}>
              <Question
                question={question}
                selectedValue={inputValues[index]}
                onCo2ValuesChange={(value, inputValue) =>
                  handleCo2ValuesChange(index, value, inputValue)
                }
                rememberValue={[...props.rememberValue, index]}
                detailed={isDetailed}
              />
              <Divider sx={{ my: 1 }} />
            </Box>
          ))
        ) : (
          <Question
            question={props.questions.quick}
            selectedValue={quickInputReminder}
            onCo2ValuesChange={handleQuick}
            rememberValue={props.rememberValue}
            detailed={isDetailed}
          />
        )}
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          {props.questions.detailed.questions.length > 0 && (
            <FormGroup>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography>detailliert</Typography>
                <Switch checked={!!isDetailed} onChange={handleSwitchChange} />
              </Stack>
            </FormGroup>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default QuestionBlock;
