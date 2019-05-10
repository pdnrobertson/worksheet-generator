import React from "react";

export default function AddStudentSummary(props) {
  return (
    <div>
      <p>Confirm you would like to add the following students:</p>
      <ul className="list-group">
        {props.students.map(student => (
          <li className="list-group-item">
            {student.firstName} {student.lastName}
          </li>
        ))}
      </ul>
    </div>
  );
}
