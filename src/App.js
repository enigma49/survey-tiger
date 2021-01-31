import logo from "./survey-tiger.PNG";
import "./App.css";
import { Button } from "reactstrap";
import { Switch, Route, Link, useHistory } from "react-router-dom";
import CreateSurvey from "./components/CreateSurvey";
import TakeSurvey from "./components/TakeSurvey";
import { useDispatch } from "react-redux";
import { createSurvey } from "./store/surveySlic";
import { unwrapResult } from "@reduxjs/toolkit";
import ConfirmSurvey from "./components/ConfirmSurvey";
function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  const redirectToNewSurvey = () => {
    dispatch(createSurvey()).then(unwrapResult).then(newSurveyId => history.push("/create/"+newSurveyId));
  }
  return (
        <div className="App">
          <header>
            <img src={logo} className="App-logo" alt="logo" />
          </header>
          {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/create/:surveyId">
              <CreateSurvey />
            </Route>
            <Route path="/take"><TakeSurvey /></Route>
            <Route path="/confirm/:surveyId"><ConfirmSurvey /></Route>
            <Route path="/">
              <header className="App-header">
                <Button
                  className="survey-main-btn"
                  onClick={redirectToNewSurvey}
                >
                  Create Survey
                </Button>
                <Link to="/take">
                  <Button className="survey-main-btn">Take Survey</Button>
                </Link>
              </header>
            </Route>
          </Switch>
        </div>    
  );
}

export default App;
