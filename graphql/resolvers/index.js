const TeacherUser = require("../../models/TeacherUser");
const Classroom = require("../../models/Classroom");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { classrooms, singleTeacher } = require("./merge");

// GraphQL Resolvers
const resolvers = {
  Query: {
    // ...authQueries
    getCurrentUser: async (_, args, context) => {
      if (!context.user) {
        throw new Error("Unauthenticated.");
      }
      // User is authenticated, find the user
      const user = await TeacherUser.findById(context.user.id);
      if (!user) {
        throw new Error("User not found.");
      }

      // Return the user
      return user._doc;
    },

    login: async (_, args) => {
      const { email, password } = args;

      try {
        // Find if user exists
        const user = await TeacherUser.findOne({ email });
        if (!user) {
          throw new Error("User not found.");
        }

        // Now check if the passwords are equal
        const isEqual = bcrypt.compare(password, user.password);
        if (!isEqual) {
          throw new Error("Password incorrect.");
        }

        // All good, authenticate user with jwt
        const token = jwt.sign(
          { id: user.id, email: user.email },
          "supersecretawesomecode",
          { expiresIn: "1d" }
        );

        // Return user and token
        return {
          token,
          user
        };
      } catch (err) {
        throw err;
      }
    }
  },

  Mutation: {
    createClassroom: async (_, args, context) => {
      if (!context.user) {
        throw new Error("Unauthenticated.");
      }
      const teacherId = context.user.id;
      const { name, year_level } = args.classroomInput;
      const classroom = await new Classroom({
        name,
        year_level,
        numOfStudents: 0,
        teacher: teacherId
      });
      let createdClassroom;

      try {
        const result = await classroom.save();
        console.log(result._doc);

        createdClassroom = {
          ...result._doc,
          teacher: singleTeacher.bind(this, result._doc.teacher)
        };
        const user = await TeacherUser.findById(teacherId);
        if (!user) {
          throw new Error("Teacher not found");
        }

        user.classrooms.push(classroom);
        await user.save();

        return createdClassroom;
      } catch (err) {
        throw err;
      }
    },

    signup: async (_, args) => {
      const {
        firstName,
        lastName,
        email,
        school,
        password
      } = args.teacherUserInput;

      try {
        // Find if user exists already
        const teacherUser = await TeacherUser.findOne({ email });

        if (teacherUser) {
          throw new Error("User already exists.");
        }

        // Create a hashed password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create the new teacher and save to the database
        const newTeacherUser = await new TeacherUser({
          firstName,
          lastName,
          email,
          school,
          password: hashedPassword
        }).save();

        const savedTeacherUser = { ...newTeacherUser._doc, password: null };

        // Authenticate user with jwt
        const token = jwt.sign(
          {
            id: savedTeacherUser.id,
            email: savedTeacherUser.email
          },
          "supersecretawesomecode"
        );

        // Return token and created user
        return { token, user: savedTeacherUser };
      } catch (err) {
        throw err;
      }
    }
  }
};

module.exports = resolvers;
