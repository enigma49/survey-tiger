import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { surveySlice } from "../store/surveySlic";
import {
  Button,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
} from "reactstrap";
const MultiSelect = () => {
  const [options, setOptions] = useState([""]);
  const [question, setQuestion] = useState("");
  const {surveyId} = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const addOption = (idx) => {
    if (options.length < 4) {
      const newOptions = [...options, ""];
      const newOptionsIdx = idx + 1;
      let currentNewOptionIdx = newOptions.length - 1;
      while (newOptionsIdx !== currentNewOptionIdx) {
        newOptions[currentNewOptionIdx] = newOptions[currentNewOptionIdx - 1];
        currentNewOptionIdx--;
        newOptions[currentNewOptionIdx] = "";
      }
      setOptions(newOptions);
    }
  };
  const removeOption = (idx) => {
    console.log("remove options");
    if (options.length > 1) {
      options.splice(idx, 1);
      setOptions([...options]);
    }
  };
  const setOptionInArray = (value, optionIdx) => {
    options[optionIdx] = value;
    setOptions([...options]);
  };
  const isNullOrDefined = () => {
    return (
      question.trim() === "" ||
      options.find((x) => x.trim() === "") !== undefined
    );
  };

  const addQuestionClickAction = () => {
    const payload = { options, question, surveyId, type: "multi" };
    dispatch(surveySlice.actions.addQuestion(payload));
    history.push("/create/" + surveyId + "?clear=true");
  };
  return (
    <div className="question-container">
      <InputGroup>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>?</InputGroupText>
        </InputGroupAddon>
        <Input
          placeholder="Your Question"
          onChange={(e) => {
            setQuestion(e.target.value);
          }}
          value={question}
        />
      </InputGroup>
      <br />
      <h3>Options</h3>
      {options.map((option, optionIdx) => (
        <InputGroup key={`Option${optionIdx + 1}`}>
          <InputGroupAddon className="input-grp" addonType="append">
            <Button
              onClick={() => addOption(optionIdx)}
              disabled={options.length >= 4}
            >
              +
            </Button>
            <Button
              onClick={() => removeOption(optionIdx)}
              disabled={options.length === 1}
            >
              -
            </Button>
          </InputGroupAddon>
          <Input
            placeholder={`Option${optionIdx + 1}`}
            value={option}
            onChange={(e) => setOptionInArray(e.target.value, optionIdx)}
          />
        </InputGroup>
      ))}
      {options.length === 4 ? (
        <div className="question-buttons">
          <Button
            className="survey-qts-btn"
            onClick={addQuestionClickAction}
            disabled={isNullOrDefined()}
          >
            Add Question
          </Button>
          <Button className="survey-qts-btn" disabled={isNullOrDefined()}>
            Publish Question
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default MultiSelect;
