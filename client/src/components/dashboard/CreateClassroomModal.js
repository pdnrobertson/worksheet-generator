import Modal from "react-bootstrap/Modal";
import React, { Component, Fragment } from "react";
import { Mutation } from "react-apollo";
import { Redirect } from "react-router-dom";
import { CREATE_CLASSROOM, GET_CURRENT_USER } from "../../graphql-utils";

export class CreateClassroomModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirectToClassroom: false,
      classroomId: ""
    };

    this.nameRel = React.createRef();
    this.yearLevelRel = React.createRef();
  }

  render() {
    if (this.state.redirectToClassroom) {
      return <Redirect to={`/classroom/${this.state.classroomId}`} />;
    }
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="container-modal-title-vcenter"
      >
        <Fragment>
          <Modal.Header closeButton>
            <Modal.Title>Add Classroom</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Mutation
              mutation={CREATE_CLASSROOM}
              ignoreResults={false}
              refetchQueries={() => [
                {
                  query: GET_CURRENT_USER
                }
              ]}
            >
              {(createClassroom, { data, loading, error }) => (
                <div>
                  <form
                    onSubmit={e => {
                      e.preventDefault();
                      const name = this.nameRel.current.value;
                      const year_level = this.yearLevelRel.current.value;
                      const classroomInput = { name, year_level };

                      createClassroom({ variables: { classroomInput } });

                      this.nameRel.current.value = "";
                      this.yearLevelRel.current.value = "";

                      this.props.onHide();
                    }}
                  >
                    <fieldset>
                      <div className="form-group">
                        <label htmlFor="classroomName">
                          Enter Classroom Name
                        </label>
                        <input
                          ref={this.nameRel}
                          className="form-control"
                          type="text"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="classroomYearLevel">
                          Enter Classroom Year Level
                        </label>
                        <input
                          ref={this.yearLevelRel}
                          className="form-control"
                          type="text"
                          required
                        />
                      </div>
                    </fieldset>
                    <button type="submit" className="btn btn-success">
                      Create Classroom
                    </button>
                  </form>
                  {loading && <p>Loading...</p>}
                  {error && <p>Error : Please try again</p>}
                </div>
              )}
            </Mutation>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-primary" onClick={this.props.onHide}>
              Close
            </button>
          </Modal.Footer>
        </Fragment>
      </Modal>
    );
  }
}

export default CreateClassroomModal;
