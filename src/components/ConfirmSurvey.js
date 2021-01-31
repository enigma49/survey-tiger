import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { Button } from "reactstrap";
import { surveySlice } from "../store/surveySlic";
function ConfirmSurvey() {
  const { surveyId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const surveyData = useSelector((globalStore) =>
    globalStore.surveys.find((s) => s.surveyId === surveyId)
  );
  const confirmAndPublishSurvey = () => {
      const payload = {surveyId};
      dispatch(surveySlice.actions.markPublished(payload));
      history.push("/");  
  };
  return (
    <>
      <div>
        <div>
          {surveyData.questions.map((q) => (
            <div key={surveyId + Math.random()}>
              <h4>{q.question}</h4>
              {q.type === "single" ? (
                <div>
                  <label>{q.options[0]}</label>
                  <input type="radio" />
                  <label>{q.options[1]}</label>
                  <input type="radio" />
                </div>
              ) : (
                <div>
                  <label>{q.options[0]}</label>
                  <input type="checkbox" />
                  <label>{q.options[1]}</label>
                  <input type="checkbox" />
                  <label>{q.options[2]}</label>
                  <input type="checkbox" />
                  <label>{q.options[3]}</label>
                  <input type="checkbox" />
                </div>
              )}
            </div>
          ))}
          <Button className="survey-main-btn" onClick={confirmAndPublishSurvey}>
            Confirm
          </Button>
        </div>
      </div>
    </>
  );
}

export default ConfirmSurvey;
