const TeacherUser = require("../../models/TeacherUser");
const Classroom = require("../../models/Classroom");

const { singleTeacher } = require("./merge");

const classroomQueries = {};

const classroomMutations = {
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
  }
};

exports.classroomQueries = classroomQueries;
exports.classroomMutations = classroomMutations;
