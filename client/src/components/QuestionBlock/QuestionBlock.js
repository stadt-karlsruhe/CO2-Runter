import * as React from "react";
import Box from "@mui/material/Box";
import Inputfield from "./Inputfield";
import Selection from "./Selection";
import Slider from "./Slider";

const QuestionBlock = (props) => {
  const answerTyp = props.question.typ;
  const questionText = props.question.text;

  switch (answerTyp) {
    case "input":
      return (
        <Box>
          <h4>{questionText}</h4>
          <Inputfield value={props.value} />
        </Box>
      );
    case "auswahl":
      return (
        <Box>
          <h4>{questionText}</h4>
          <Selection
            label={props.label}
            replies={props.question.replies}
            values={props.question.values}
          />
        </Box>
      );
    case "slider":
      return (
        <Box>
          <h4>{questionText}</h4>
          <Slider replies={props.replies} values={props.values} />
        </Box>
      );
    default:
      return (
        <Box>
          <h4>{questionText}</h4>
          <p>Es wurde kein Antwortformat für diese Frage gefunden</p>
        </Box>
      );
  }
};

export default QuestionBlock;
