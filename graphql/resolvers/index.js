const { authQueries, authMutations } = require("./authResolvers");
const {
  classroomQueries,
  classroomMutations
} = require("./classroomResolvers");

// GraphQL Resolvers
const resolvers = {
  Query: {
    ...authQueries,
    ...classroomQueries
  },

  Mutation: {
    ...authMutations,
    ...classroomMutations
  }
};

module.exports = resolvers;
