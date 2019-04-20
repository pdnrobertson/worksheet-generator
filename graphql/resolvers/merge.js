const Classroom = require("../../models/Classroom");
const TeacherUser = require("../../models/TeacherUser");
const Student = require("../../models/Student");

// const mongoose = require("mongoose");

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

const singleClassroom = async classroomId => {
  try {
    const singleClassroom = await Classroom.findById(classroomId);

    return {
      ...singleClassroom._doc,
      students: students.bind(this, singleClassroom._doc.students)
    };
  } catch (err) {
    throw err;
  }
};

const students = async studentIds => {
  try {
    const students = await Student.find({ _id: { $in: studentIds } });

    return students.map(student => {
      return {
        ...student._doc,
        classroom: singleClassroom.bind(this, student.classroom)
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
      ...singleTeacher._doc,
      classrooms: classrooms.bind(this, singleTeacher._doc.classrooms)
    };
  } catch (err) {
    throw err;
  }
};

exports.students = students;
exports.singleClassroom = singleClassroom;
exports.classrooms = classrooms;
exports.singleTeacher = singleTeacher;
