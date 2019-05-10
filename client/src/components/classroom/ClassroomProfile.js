import React from "react";

export default function ClassroomProfile(props) {
  const { name, year_level, teacher, numOfStudents } = props.info;
  return (
    <div>
      <div className="card mb-3">
        <div className="card-header">Summary</div>
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <ul className="list-group bg-primary list-group-flush">
            <li className="list-group-item">
              Teacher: {teacher.firstName} {teacher.lastName}
            </li>
            <li className="list-group-item">Year Level: {year_level}</li>
            <li className="list-group-item">
              Number of Students: {numOfStudents}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
