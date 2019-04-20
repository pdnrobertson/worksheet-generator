const { authQueries, authMutations } = require("./authResolvers");
const {
  classroomQueries,
  classroomMutations
} = require("./classroomResolvers");
const { studentQueries, studentMutations } = require("./studentResolvers");

// GraphQL Resolvers
const resolvers = {
  Query: {
    ...authQueries,
    ...classroomQueries,
    ...studentQueries
  },

  Mutation: {
    ...authMutations,
    ...classroomMutations,
    ...studentMutations
  }
};

module.exports = resolvers;
