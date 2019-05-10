import React from "react";
import { Mutation } from "react-apollo";
import { DELETE_STUDENT, GET_CLASSROOM } from "../../graphql-utils";

export default function StudentList({ students, classroomId }) {
  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th scope="col">First Name</th>
          <th scope="col">Last Name</th>
          <th scope="col">Options</th>
        </tr>
      </thead>
      <tbody>
        {students.map(student => (
          <tr key={student._id}>
            <th>{student.firstName}</th>
            <td>{student.lastName}</td>
            <td>
              <button className="btn btn-warning">Edit</button>
              <Mutation
                mutation={DELETE_STUDENT}
                refetchQueries={() => [
                  {
                    query: GET_CLASSROOM
                  }
                ]}
              >
                {(deleteStudent, { loading, error, data }) => {
                  return (
                    <button
                      onClick={e => {
                        console.log(classroomId);
                        e.preventDefault();

                        deleteStudent({
                          variables: {
                            studentId: student._id,
                            classroomId: classroomId.toString()
                          }
                        });

                        return;
                      }}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  );
                }}
              </Mutation>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
