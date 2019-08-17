import React, { useState } from "react";
import { Student } from "./types";
import "./StudentInfo.css";

interface Props {
  student: Student;
}

const StudentInfo: React.FC<Props> = props => {
  const { student } = props;
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [tags, setTags] = useState<string[]>(() => student.tags);

  return (
    <div className="student">
      <img
        className="profile-pic"
        src={student.pic}
        alt={`${student.firstName} ${student.lastName}`}
      />
      <div className="student-details">
        <h1 className="student-name">
          {student.firstName} {student.lastName}
        </h1>
        <ul className="student-demographics">
          <li>Email: {student.email}</li>
          <li>Company: {student.company}</li>
          <li>Skill: {student.skill}</li>
          <li>Average Grade: {student.averageGrade}%</li>
        </ul>
        <div>
          {isExpanded && (
            <React.Fragment>
              <ul className="student-grades">
                {student.grades.map((grade, index) => {
                  return (
                    <li key={index}>
                      <span className="test-number">Test {index + 1}:</span>
                      {grade}%
                    </li>
                  );
                })}
              </ul>
              <div className="tag-container">
                {tags.map((tag, index) => {
                  return (
                    <div className="tag" key={index}>
                      {tag}
                    </div>
                  );
                })}

                <input
                  className="tag-input"
                  placeholder="Add a tag"
                  autoFocus
                  onKeyDown={event => {
                    if (event.key === "Enter") {
                      student.tags.push(event.currentTarget.value);
                      event.currentTarget.value = "";
                      console.log(student.tags);
                      setTags(student.tags.concat());
                    }
                  }}
                />
              </div>
            </React.Fragment>
          )}
        </div>
      </div>
      <button
        className="collapsible"
        onClick={() => {
          setIsExpanded(!isExpanded);
        }}
      >
        {isExpanded ? "-" : "+"}
      </button>
    </div>
  );
};

export default StudentInfo;
