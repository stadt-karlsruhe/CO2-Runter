import React from "react";
import Selection from "./Selection";
import InputField from "./Inputfield";
import Slider from "./Slider";

const Question = (props) => {
  const { text, typ, replies, values } = props.question;

  let Component;

  switch (typ) {
    case "auswahl":
      Component = Selection;
      break;
    case "input":
      Component = InputField;
      break;
    case "slider":
      Component = Slider;
      break;
    default:
      Component = null;
      break;
  }

  return (
    <div>
      <h5>{text}</h5>
      {Component && <Component replies={replies} values={values} />}
    </div>
  );
};

export default Question;
