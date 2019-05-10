import React from "react";
import { Link } from "react-router-dom";

export default function ClassroomSummary(props) {
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
            <tr key={classroom._id}>
              <th>
                <Link to={`/classroom/${classroom._id}`}>{classroom.name}</Link>
              </th>
              <td>{classroom.year_level}</td>
              <td>{classroom.numOfStudents}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
