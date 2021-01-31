import React, { useEffect, useState } from "react";
import { useParams, useLocation, useHistory } from "react-router-dom";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import MultiSelect from "./MultiSelect";
import SingleSelect from "./SingleSelect";

const CreateSurvey = () => {
  const { surveyId } = useParams();
  const history = useHistory();
  const query = useLocation().search;
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownText, setDropdownText] = useState("Select Question Type");

  useEffect(() => {
    if (query === "?clear=true") {
      setDropdownText("Select Question Type");
      history.push("/create/"+surveyId);
    }
  }, [query, history, surveyId]);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  return (
    <>
      <p>SurveyId : {surveyId}</p>
      <Dropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle caret>{dropdownText}</DropdownToggle>
        <DropdownMenu>
          <DropdownItem
            onClick={() => setDropdownText("Multi Select Questions")}
          >
            Multi Select Questions
          </DropdownItem>
          <DropdownItem
            onClick={() => setDropdownText("Single Select Questions")}
          >
            Single Select Questions
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      {dropdownText === "Multi Select Questions" ? <MultiSelect /> : null}
      {dropdownText === "Single Select Questions" ? <SingleSelect /> : null}
    </>
  );
};

export default CreateSurvey;
