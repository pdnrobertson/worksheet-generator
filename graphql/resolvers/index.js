const TeacherUser = require("../../models/TeacherUser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// GraphQL Resolvers
const resolvers = {
  Query: {
    hello: () => {
      return "Hello World";
    }
  },

  Mutation: {
    signup: async (_, args) => {
      const {
        firstName,
        lastName,
        email,
        school,
        password
      } = args.teacherUserInput;

      try {
        const teacherUser = await TeacherUser.findOne({ email });

        if (teacherUser) {
          throw new Error("User already exists.");
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newTeacherUser = await new TeacherUser({
          firstName,
          lastName,
          email,
          school,
          password: hashedPassword
        }).save();

        const savedTeacherUser = { ...newTeacherUser._doc, password: null };

        const token = jwt.sign(
          {
            id: savedTeacherUser.id,
            email: savedTeacherUser.email
          },
          "supersecretawesomecode"
        );

        return { token, user: savedTeacherUser };
      } catch (err) {
        throw err;
      }
    }
  }
};

module.exports = resolvers;
