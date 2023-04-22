import React, { useEffect, useState } from "react";
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

  const calculateDetailedCo2 = () => {
    const formulaString = props.questions.detailed.formula;
    const formula = eval(`(${formulaString})`);
    return formula(co2Values);
  };

  useEffect(() => {
    const co2 = calculateDetailedCo2();
    props.onCo2ValuesChange(co2);
  }, [co2Values]);

  const handleCo2ValuesChange = (index, value) => {
    const newCo2Values = [...co2Values];
    newCo2Values[index] = value;
    setCo2Values(newCo2Values);
  };

  return (
    <Container maxWidth="sm">
      <Paper
        sx={{ my: 2, p: 2, backgroundColor: "#f0f0f0", borderRadius: "8px" }}
      >
        <Typography variant="h5" component="div" sx={{ fontWeight: "bold" }}>
          {props.questions.name}
        </Typography>
        <Divider />
        {props.isDetailed ? (
          props.questions.detailed.questions.map((question, index) => (
            <Box key={index}>
              <Question
                question={question}
                onCo2ValuesChange={(value) =>
                  handleCo2ValuesChange(index, value)
                }
              />
              <Divider sx={{ my: 1 }} />
            </Box>
          ))
        ) : (
          <Question
            question={props.questions.quick}
            onCo2ValuesChange={props.onCo2ValuesChange}
          />
        )}
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <FormGroup>
            <Stack direction="row" spacing={1} alignItems="center">
              {props.isDetailed ? (
                <Typography>detailliert</Typography>
              ) : (
                <Typography>schnell</Typography>
              )}
              <Switch
                checked={!!props.isDetailed}
                onChange={props.onSwitchChange}
              />
            </Stack>
          </FormGroup>
        </Box>
      </Paper>
    </Container>
  );
};

export default QuestionBlock;
