import React, { useState, useEffect } from "react";
import "./App.css";
import { Student } from "./types";
import StudentInfo from "./StudentInfo";

const App: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [nameFilter, setNameFilter] = useState<string>("");
  const [tagFilter, setTagFilter] = useState<string>("");

  // useEffect and setting the second parameter to an empty array disables constant rendering
  useEffect(() => {
    fetch("https://www.example.com/api/assessment/students")
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        console.log(JSON.stringify(data, null, 2));
        data.students.forEach((student: Student) => {
          student.tags = [];
        });
        setStudents(data.students);
      });
  }, []);

  // filters students by name typed in the name search input (case insensitive)
  let filteredStudents = students.filter(student => {
    return (
      new RegExp(nameFilter, "i").test(student.firstName) ||
      new RegExp(nameFilter, "i").test(student.lastName)
    );
  });

  // if there are any tags typed in the tag search input,
  // filter students by tag
  if (tagFilter.length > 0) {
    filteredStudents = filteredStudents.filter(student => {
      for (let tag of student.tags) {
        if (new RegExp(tagFilter, "i").test(tag)) {
          return true;
        }
      }
      return false;
    });
  }

  // calculate average test grade for each student
  filteredStudents.forEach((student, index) => {
    student.averageGrade =
      student.grades.reduce((accumulator: number, grade: string) => {
        return accumulator + parseInt(grade, 10);
      }, 0) / student.grades.length;
  });

  return (
    <div className="container">
      <div className="App">
        <input
          className="filter"
          placeholder="Search by name"
          onChange={event => {
            setNameFilter(event.currentTarget.value);
          }}
        />
        <input
          className="filter"
          placeholder="Search by tags"
          onChange={event => {
            setTagFilter(event.currentTarget.value);
          }}
        />
        {filteredStudents.map((student, index) => {
          return <StudentInfo student={student} key={student.id} />;
        })}
      </div>
    </div>
  );
};

export default App;
