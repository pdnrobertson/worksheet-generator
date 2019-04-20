const TeacherUser = require("../../models/TeacherUser");
const Classroom = require("../../models/Classroom");

const { singleTeacher, students } = require("./merge");

const classroomQueries = {
  getClassroom: async (_, args, context) => {
    if (!context.user) {
      throw new Error("Unauthenticated.");
    }

    let foundClassroom;
    try {
      // Find corresponding classroom
      const classroom = await Classroom.findById(args.classroomId);

      // Check to see if authorized to delete classroom
      if (context.user.id !== classroom._doc.teacher.toString()) {
        throw new Error("Not authorized to access this classroom.");
      }

      foundClassroom = {
        ...classroom._doc,
        teacher: singleTeacher.bind(this, classroom._doc.teacher),
        students: students.bind(this, classroom._doc.students)
      };

      return foundClassroom;
    } catch (err) {
      throw err;
    }
  }
};

const classroomMutations = {
  createClassroom: async (_, args, context) => {
    if (!context.user) {
      throw new Error("Unauthenticated.");
    }
    const teacherId = context.user.id;
    const { name, year_level } = args.classroomInput;

    let createdClassroom;

    try {
      const classroom = await new Classroom({
        name,
        year_level,
        numOfStudents: 0,
        teacher: teacherId
      });
      const result = await classroom.save();

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

  deleteClassroom: async (_, args, context) => {
    if (!context.user) {
      throw new Error("Unauthenticated.");
    }

    try {
      // Find corresponding classroom
      const classroom = await Classroom.findById(args.classroomId);
      const teacher = await TeacherUser.findById(context.user.id);

      // Check to see if authorized to delete classroom
      if (classroom._doc.teacher.toString() !== context.user.id) {
        throw new Error("Not authorized to make changes to this classroom.");
      }

      teacher.classrooms = teacher.classrooms.filter(classroom => {
        return classroom._id.toString() !== args.classroomId;
      });

      await teacher.save();

      // Remove the classroom
      await classroom.remove();
      return "Classroom removed.";
    } catch (err) {
      throw err;
    }
  }
};

exports.classroomQueries = classroomQueries;
exports.classroomMutations = classroomMutations;
