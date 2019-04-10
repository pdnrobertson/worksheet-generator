const Classroom = require("../../models/Classroom");
const TeacherUser = require("../../models/TeacherUser");

const mongoose = require("mongoose");

const classrooms = async classroomIds => {
  try {
    const classrooms = await Classroom.find({ _id: { $in: classroomIds } });

    return classrooms.map(classroom => {
      return {
        ...classroom._doc,
        teacher: singleTeacher.bind(this, classroom.teacher)
      };
    });
  } catch (err) {
    throw err;
  }
};

const singleTeacher = async teacherId => {
  try {
    const singleTeacher = await TeacherUser.findById(teacherId);

    return {
      ...teacherUser._doc,
      classrooms: classrooms.bind(this, singleTeacher._doc.classrooms)
    };
  } catch (err) {
    throw err;
  }
};

exports.classrooms = classrooms;
exports.singleTeacher = singleTeacher;
