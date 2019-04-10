const TeacherUser = require("../../models/TeacherUser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authQueries = {
  getCurrentUser: async (_, args, context) => {
    const user = context.user;
    if (!user) {
      throw new Error("Unauthenticated.");
    }

    const currentUser = await TeacherUser.findById(user.id);

    return currentUser._doc;
  },

  login: async (_, args) => {
    const { email, password } = args;

    try {
      const user = await TeacherUser.findOne({ email });
      if (!user) {
        throw new Error("User not found.");
      }

      const isEqual = bcrypt.compare(password, user.password);
      if (!isEqual) {
        throw new Error("Password incorrect.");
      }

      const token = jwt.sign(
        { id: user.id, email: user.email },
        "supersecretawesomecode",
        { expiresIn: "1d" }
      );

      const userId = user.id;

      return {
        token,
        userId
      };
    } catch (err) {
      throw err;
    }
  }
};

const authMutations = {
  signup: async (_, args) => {
    const { firstName, lastName, email, school, password } = args.signupInput;

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

      const userId = savedTeacherUser._id;

      return {
        token,
        userId
      };
    } catch (err) {
      throw err;
    }
  }
};

exports.authQueries = authQueries;
exports.authMutations = authMutations;
