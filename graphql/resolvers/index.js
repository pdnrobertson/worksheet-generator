const { authQueries, authMutations } = require("./authResolvers");
const {
  classroomQueries,
  classroomMutations
} = require("./classroomResolvers");
const { studentQueries, studentMutations } = require("./studentResolvers");
const {
  worksheetQueries,
  worksheetMutations
} = require("./worksheetResolvers");
const { GraphQLDate } = require("graphql-iso-date");

// GraphQL Resolvers
const resolvers = {
  Date: GraphQLDate,

  Query: {
    ...authQueries,
    ...classroomQueries,
    ...studentQueries,
    ...worksheetQueries
  },

  Mutation: {
    ...authMutations,
    ...classroomMutations,
    ...studentMutations,
    ...worksheetMutations
  }
};

module.exports = resolvers;
