import React, { Component, Fragment } from "react";
import { GET_CLASSROOM } from "../graphql-utils";
import { Query } from "react-apollo";
import DeleteClassroom from "../components/classroom/DeleteClassroom";
import ClassroomProfile from "../components/classroom/ClassroomProfile";
import Spinner from "react-spinkit";
import AddStudentsModal from "../components/classroom/AddStudentsModal";
import StudentList from "../components/classroom/StudentList";

export class Classroom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirectToDashboard: false,
      modalShow: false
    };
  }

  handleClose = () => {
    this.setState({ modalShow: false });
  };

  handleShow = () => {
    this.setState({ modalShow: true });
  };

  onRedirectToDashboard = () => {
    this.setState({ redirectToDashboard: true });
  };

  render() {
    return (
      <Query
        query={GET_CLASSROOM}
        variables={{ classroomId: this.props.match.params.id }}
      >
        {({ loading, error, data, refetch }) => {
          if (loading) return <Spinner name="rotating-plane" />;
          if (error) throw new Error(`Something went wrong: ${error}`);
          const {
            _id,
            name,
            year_level,
            teacher,
            numOfStudents,
            students
          } = data.getClassroom;
          return (
            <Fragment>
              <h1>Dashboard for {name}</h1>
              <div className="row">
                <div className="col-md-5">
                  <ClassroomProfile
                    info={{ name, year_level, teacher, numOfStudents }}
                  />
                </div>
                <div className="col-md-7">
                  <h3>Worksheets</h3>
                </div>
              </div>
              <div className="row">
                <h3>Students</h3>
                <button onClick={this.handleShow} className="btn btn-success">
                  Add Students
                </button>
                <button onClick={() => refetch()} className="btn btn-warning">
                  Reload
                </button>
                <AddStudentsModal
                  show={this.state.modalShow}
                  onHide={this.handleClose}
                  classroomId={_id}
                />
                <StudentList students={students} classroomId={_id} />
              </div>
              <DeleteClassroom
                redirectToDashboard={this.state.redirectToDashboard}
                classroomId={this.props.match.params.id}
                onRedirect={this.onRedirectToDashboard}
              />
            </Fragment>
          );
        }}
      </Query>
    );
  }
}

export default Classroom;
