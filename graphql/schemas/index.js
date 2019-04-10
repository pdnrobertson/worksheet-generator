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

  type Classroom {
    _id: ID!
    name: String!
    year_level: String!
    subject: String!
    teacher: TeacherUser!
    numOfStudents: Int!
  }

  input TeacherUserInput {
    firstName: String!
    lastName: String!
    email: String!
    school: String!
    password: String!
  }

  type AuthPayload {
    token: String
    user: TeacherUser
  }

  type Query {
    hello: String
    login(email: String!, password: String!): AuthPayload
  }

  type Mutation {
    signup(teacherUserInput: TeacherUserInput): AuthPayload
  }
`;

module.exports = typeDefs;
