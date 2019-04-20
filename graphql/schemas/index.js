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
  }
`;

module.exports = typeDefs;
