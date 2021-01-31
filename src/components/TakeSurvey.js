import React from "react";
import { useSelector } from "react-redux";
import { Button } from "reactstrap";
function TakeSurvey() {
  const surveyIds = useSelector((globalStore) =>
    globalStore.surveys.filter((s) => s.isPublished).map((s)=>s.surveyId)
  );
  const styles = {
    margin: "auto",
    marginTop: "20px",
    marginBottom: "10px",
    display: "block"
  }
  return (
    <>
      <div>
        <p>
          {surveyIds.map((surveyId) => (
            <Button className="survey-main-btn" key={surveyId} style={styles}>Take Survey {surveyId}</Button>
          ))}
        </p>
      </div>
    </>
  );
}

export default TakeSurvey;
