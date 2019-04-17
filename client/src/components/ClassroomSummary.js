import React from "react";

export default function ClassroomSummary(props) {
  console.log(props.classrooms);
  return (
    <div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Year Level</th>
            <th scope="col">Number of Students</th>
          </tr>
        </thead>
        <tbody>
          {props.classrooms.map(classroom => (
            <tr key={classroom.id}>
              <th>{classroom.name}</th>
              <td>{classroom.year_level}</td>
              <td>{classroom.numOfStudents}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
