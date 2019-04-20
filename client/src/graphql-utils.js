import gql from "graphql-tag";

export const GET_CURRENT_USER = gql`
  {
    getCurrentUser {
      firstName
      lastName
      email
      school
      classrooms {
        _id
        name
        year_level
        numOfStudents
      }
    }
  }
`;

export const CREATE_CLASSROOM = gql`
  mutation CreateClassroom($classroomInput: ClassroomInput!) {
    createClassroom(classroomInput: $classroomInput) {
      _id
      name
      year_level
    }
  }
`;

export const DELETE_CLASSROOM = gql`
  mutation DeleteClassroom($classroomId: String!) {
    deleteClassroom(classroomId: $classroomId)
  }
`;

export const GET_CLASSROOM = gql`
  query GetClassroom($classroomId: String!) {
    getClassroom(classroomId: $classroomId) {
      _id
      name
      year_level
      teacher {
        firstName
        lastName
      }
      students {
        firstName
        lastName
      }
    }
  }
`;

export const CREATE_STUDENT = gql`
  mutation CreateStudent($studentInput: StudentInput!) {
    createStudent(studentInput: $studentInput) {
      _id
      firstName
      lastName
    }
  }
`;
