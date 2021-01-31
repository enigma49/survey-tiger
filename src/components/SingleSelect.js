import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  Button,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
} from "reactstrap";
import { useDispatch } from "react-redux";
import { surveySlice } from "../store/surveySlic";
const SingleSelect = () => {
  const [options, setOptions] = useState(["", ""]);
  const [question, setQuestion] = useState("");
  const { surveyId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

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
    const payload = { options, question, surveyId, type: "single" };
    dispatch(surveySlice.actions.addQuestion(payload));
    history.push('/create/'+surveyId + "?clear=true");
  };

  const publishQuestion = () =>{
    const payload = { options, question, surveyId, type: "single" };
    dispatch(surveySlice.actions.addQuestion(payload));
    history.push('/confirm/'+surveyId);
  }
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
      <InputGroup>
        <InputGroupAddon className="input-grp" addonType="append">
          <InputGroupText>+</InputGroupText>
          <InputGroupText>-</InputGroupText>
        </InputGroupAddon>
        <Input
          placeholder="Option1"
          value={options[0]}
          onChange={(e) => setOptionInArray(e.target.value, 0)}
        />
      </InputGroup>
      <InputGroup>
        <InputGroupAddon className="input-grp" addonType="append">
          <InputGroupText>+</InputGroupText>
          <InputGroupText>-</InputGroupText>
        </InputGroupAddon>
        <Input
          placeholder="Option2"
          value={options[1]}
          onChange={(e) => setOptionInArray(e.target.value, 1)}
        />
      </InputGroup>
      <div className="question-buttons">
        <Button
          className="survey-qts-btn"
          onClick={addQuestionClickAction}
          disabled={isNullOrDefined()}
        >
          Add Question
        </Button>
        <Button className="survey-qts-btn" onClick={publishQuestion} disabled={isNullOrDefined()}>
          Publish Question
        </Button>
      </div>
    </div>
  );
};

export default SingleSelect;
