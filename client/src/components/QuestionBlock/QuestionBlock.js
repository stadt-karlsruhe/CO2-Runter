import React from "react";
import Switch from "@mui/material/Switch";
import Question from "./Question";
import { Box, Container, Divider, FormGroup, Stack, Typography } from "@mui/material";

const QuestionBlock = (props) => {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 2 }}>
        <Typography variant="h5" component="div">
          {props.questions.name}
        </Typography>
        <Divider />
        {props.isDetailed ? (
          props.questions.detailed.questions.map((question) => (
            <Box key={question.id}>
              <Question question={question} />
              <Divider sx={{ my: 1 }} />
            </Box>
          ))
        ) : (
          <Question question={props.questions.quick} />
          )}
        <FormGroup>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography>schnell</Typography>
            <Switch checked={props.isDetailed} onChange={props.onSwitchChange} />
            <Typography>detailliert</Typography>
          </Stack>
        </FormGroup>
      </Box>
    </Container>
  );
};

export default QuestionBlock;