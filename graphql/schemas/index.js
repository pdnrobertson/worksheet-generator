const { gql } = require("apollo-server-express");

// GraphQL Schemas
const typeDefs = gql`
  type TeacherUser {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    school: String
    country: String
    password: String!
    classrooms: [Classroom!]
    createdWorksheets: [Worksheet!]
  }

  input TeacherUserInput {
    firstName: String!
    lastName: String!
    email: String!
    school: String!
    password: String!
  }

  type Classroom {
    _id: ID!
    name: String!
    year_level: String!
    subject: String
    teacher: TeacherUser!
    students: [Student!]
    numOfStudents: Int!
    assignedWorksheets: [Worksheet!]
  }

  input ClassroomInput {
    name: String!
    year_level: String!
  }

  type Student {
    _id: ID!
    firstName: String!
    lastName: String!
    classroom: Classroom!
  }

  input StudentInput {
    firstName: String!
    lastName: String!
    classroomId: String!
  }

  scalar Date

  type Worksheet {
    _id: ID!
    title: String!
    creator: TeacherUser!
    dateCreated: Date!
    classroomsAssigned: [Classroom!]
  }

  input WorksheetInput {
    title: String!
    creatorId: String!
  }

  type AuthPayload {
    token: String
    userId: String
  }

  type Query {
    login(email: String!, password: String!): AuthPayload
    getCurrentUser: TeacherUser
    getStudentInfo(studentId: String!): Student
    getClassroom(classroomId: String!): Classroom
  }

  type Mutation {
    signup(signupInput: TeacherUserInput): AuthPayload
    createClassroom(classroomInput: ClassroomInput): Classroom
    deleteClassroom(classroomId: String): String
    createStudent(studentInput: StudentInput): Student
    deleteStudent(studentId: String, classroomId: String): String
    createWorksheet(worksheetInput: WorksheetInput): Worksheet
    deleteWorksheet(worksheetId: String): String
  }
`;

module.exports = typeDefs;
