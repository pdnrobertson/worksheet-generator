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
    numOfStudents: Int!
  }

  input ClassroomInput {
    name: String!
    year_level: String!
  }

  type AuthPayload {
    token: String
    userId: String
  }

  type Query {
    login(email: String!, password: String!): AuthPayload
    getCurrentUser: TeacherUser
  }

  type Mutation {
    signup(signupInput: TeacherUserInput): AuthPayload
    createClassroom(classroomInput: ClassroomInput): Classroom
  }
`;

module.exports = typeDefs;
