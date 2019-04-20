import React, { Component } from "react";
import { Query } from "react-apollo";
import { GET_CURRENT_USER } from "../graphql-utils";
import ClassroomSummary from "../components/dashboard/ClassroomSummary";
import ProfileSummary from "../components/dashboard/ProfileSummary";
import CreateClassroomModal from "../components/dashboard/CreateClassroomModal";
import Spinner from "react-spinkit";

export class Dashboard extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      modalShow: false
    };
  }

  handleClose = () => {
    this.setState({ modalShow: false });
  };

  handleShow = () => {
    this.setState({ modalShow: true });
  };

  render() {
    return (
      <div>
        <Query query={GET_CURRENT_USER}>
          {({ loading, error, data, refetch }) => {
            if (loading) return <Spinner name="rotating-plane" />;
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
                <button className="btn btn-success" onClick={this.handleShow}>
                  Add Classroom
                </button>
                <button onClick={() => refetch()} className="btn btn-warning">
                  Reload
                </button>
                <br />
                <div className="row">
                  <div className="col-md-5">
                    <ProfileSummary
                      profile={{ firstName, lastName, email, school }}
                    />
                  </div>
                  <CreateClassroomModal
                    show={this.state.modalShow}
                    onHide={this.handleClose}
                  />
                  <div className="col-md-7">
                    <ClassroomSummary classrooms={classrooms} />
                  </div>
                </div>
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default Dashboard;
