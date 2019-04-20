import React, { Component, Fragment } from "react";
import Modal from "react-bootstrap/Modal";
import { Mutation } from "react-apollo";
import { CREATE_STUDENT, GET_CLASSROOM } from "../../graphql-utils";
import AddStudentSummary from "./AddStudentSummary";

export class AddStudentsModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      confirmAddStudents: false,
      students: []
    };

    this.studentNamesEl = React.createRef();
  }
  render() {
    return (
      <div>
        <Modal
          {...this.props}
          size="lg"
          aria-labelledby="container-modal-title-vcenter"
        >
          <Fragment>
            <Modal.Header closeButton>
              <Modal.Title>Add Students</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Mutation
                mutation={CREATE_STUDENT}
                refetchQueries={() => [
                  {
                    query: GET_CLASSROOM
                  }
                ]}
              >
                {(createStudent, { loading, data, error }) => {
                  return (
                    <form
                      onSubmit={e => {
                        e.preventDefault();

                        const studentNames = this.studentNamesEl.current.value
                          .trim()
                          .split("\n");

                        const studentList = studentNames.map(student => ({
                          firstName: student.split(" ")[0],
                          lastName: student.split(" ")[1]
                        }));

                        this.setState({
                          confirmAddStudents: true,
                          students: studentList
                        });
                      }}
                    >
                      <div className="form-group">
                        <textarea
                          name="studentNames"
                          id=""
                          cols="30"
                          rows="10"
                          className="form-control"
                          placeholder="Add students names. First name and last name separated by a space, and students separated by line."
                          ref={this.studentNamesEl}
                        />
                      </div>
                      {this.state.confirmAddStudents && (
                        <AddStudentSummary students={this.state.students} />
                      )}
                      <br />
                      {!this.state.confirmAddStudents && (
                        <button type="submit" className="btn btn-success">
                          Add Students
                        </button>
                      )}
                      {this.state.confirmAddStudents && (
                        <button
                          onClick={e => {
                            e.preventDefault();

                            this.state.students.forEach(
                              ({ firstName, lastName }) => {
                                const studentInput = {
                                  firstName,
                                  lastName,
                                  classroomId: this.props.classroomId
                                };
                                createStudent({ variables: { studentInput } });

                                this.studentNamesEl = "";

                                this.props.onHide();
                              }
                            );
                          }}
                          className="btn btn-success"
                        >
                          Confirm
                        </button>
                      )}
                    </form>
                  );
                }}
              </Mutation>
            </Modal.Body>
            <Modal.Footer>
              <button className="btn" onClick={this.props.onHide}>
                Close
              </button>
            </Modal.Footer>
          </Fragment>
        </Modal>
      </div>
    );
  }
}

export default AddStudentsModal;
