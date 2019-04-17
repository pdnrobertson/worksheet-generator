import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import ClassroomSummary from "../components/ClassroomSummary";

const GET_CURRENT_USER = gql`
  {
    getCurrentUser {
      firstName
      lastName
      email
      school
      classrooms {
        name
        year_level
        numOfStudents
      }
    }
  }
`;

export default function Dashboard() {
  return (
    <Query query={GET_CURRENT_USER}>
      {({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) throw new Error(`Error! ${error}`);
        const {
          firstName,
          lastName,
          email,
          school,
          classrooms
        } = data.getCurrentUser;
        return (
          <div>
            <h1>Welcome {`${firstName} ${lastName}`}</h1>
            <br />
            <div className="row">
              <div className="col-md-5">
                <div className="card mb-3">
                  <div className="card-header">Profile</div>
                  <div className="card-body">
                    <h5 className="card-title">{`${firstName} ${lastName}`}</h5>
                    <ul className="list-group bg-primary list-group-flush">
                      <li className="list-group-item">Email: {email}</li>
                      <li className="list-group-item">School: {school}</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-7">
                <ClassroomSummary classrooms={classrooms} />
              </div>
            </div>
          </div>
        );
      }}
    </Query>
  );
}
