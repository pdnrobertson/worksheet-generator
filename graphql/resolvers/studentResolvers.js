const Student = require("../../models/Student");
const Classroom = require("../../models/Classroom");
const TeacherUser = require("../../models/TeacherUser");
const { singleClassroom } = require("./merge");

const studentQueries = {
  getStudentInfo: async (_, args, context) => {
    if (!context.user) {
      throw new Error("Unauthenticated");
    }
    console.log(args.studentId);
    try {
      const student = await Student.findById(args.studentId);
      return student._doc;
    } catch (err) {
      throw err;
    }
  }
};

const studentMutations = {
  createStudent: async (_, args, context) => {
    if (!context.user) {
      throw new Error("Unauthenticated");
    }
    // Get arguments
    const { firstName, lastName, classroomId } = args.studentInput;
    let createdStudent;
    try {
      const classroom = await Classroom.findById(args.studentInput.classroomId);
      if (!classroom) {
        throw new Error("Classroom not found.");
      }

      // Create new mongodb student
      const student = await new Student({
        firstName,
        lastName,
        classroom: classroomId
      });

      // Save the student to the database
      const result = await student.save();
      console.log(result._doc);

      // Bind classroom object to created student
      createdStudent = {
        ...result._doc,
        classroom: singleClassroom.bind(this, result._doc.classroom)
      };

      // Push student into classroom students array
      classroom.students.push(student);
      classroom.numOfStudents += 1;
      console.log(classroom.numOfStudents);

      // Save classroom
      await classroom.save();

      // Return the created student
      return createdStudent;
    } catch (err) {
      throw err;
    }
  },

  deleteStudent: async (_, args, context) => {
    if (!context.user) {
      throw new Error("Unauthenticated.");
    }

    try {
      // Find corresponding student
      const student = await Student.findById(args.studentId);
      const classroom = await Classroom.findById(args.classroomId);

      if (!student) {
        throw new Error("Student not found.");
      }

      if (!classroom) {
        throw new Error("Classroom not found.");
      }

      // Check to see if authorized to delete student
      if (context.user.id !== classroom._doc.teacher.toString()) {
        throw new Error("Not authorised to make changes to the student.");
      }

      // Remove student from array
      classroom.students = classroom.students.filter(
        keepStudent => keepStudent._id.toString() !== args.studentId
      );

      await classroom.save();

      // Remove the student
      await student.remove();
      return "Student removed.";
    } catch (err) {
      throw err;
    }
  }
};

exports.studentQueries = studentQueries;
exports.studentMutations = studentMutations;
