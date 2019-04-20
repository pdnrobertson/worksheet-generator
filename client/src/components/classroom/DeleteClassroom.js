import React from "react";
import { Mutation } from "react-apollo";
import { DELETE_CLASSROOM, GET_CURRENT_USER } from "../../graphql-utils";
import { Redirect } from "react-router-dom";

export default function DeleteClassroom(props) {
  return (
    <div>
      <Mutation
        mutation={DELETE_CLASSROOM}
        refetchQueries={() => [
          {
            query: GET_CURRENT_USER
          }
        ]}
      >
        {(deleteClassroom, { loading, error }) => {
          if (props.redirectToDashboard) {
            return <Redirect to="/dashboard" />;
          }
          return (
            <div>
              {loading && <p>Loading</p>}
              {error && <p>Oh no, an error occurred!</p>}
              <button
                className="btn btn-danger"
                onClick={e => {
                  e.preventDefault();
                  deleteClassroom({
                    variables: {
                      classroomId: props.classroomId
                    }
                  });

                  props.onRedirect();
                }}
              >
                Delete Classroom
              </button>
            </div>
          );
        }}
      </Mutation>
    </div>
  );
}
