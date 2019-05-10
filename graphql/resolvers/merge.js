const Classroom = require("../../models/Classroom");
const TeacherUser = require("../../models/TeacherUser");
const Student = require("../../models/Student");
const Worksheet = require("../../models/Worksheet");

// const mongoose = require("mongoose");

const classrooms = async classroomIds => {
  try {
    const classrooms = await Classroom.find({ _id: { $in: classroomIds } });

    return classrooms.map(classroom => {
      return {
        ...classroom._doc,
        teacher: singleTeacher.bind(this, classroom.teacher),
        assignedWorksheets: worksheets.bind(this, classroom.assignedWorksheets)
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
      students: students.bind(this, singleClassroom._doc.students),
      assignedWorksheets: worksheets.bind(
        this,
        singleClassroom._doc.assignedWorksheets
      )
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

const worksheets = async worksheetIds => {
  try {
    const worksheets = await Worksheet.find({ _id: { $in: worksheetIds } });

    return worksheets.map(worksheet => {
      return {
        ...worksheet._doc,
        creator: singleTeacher.bind(this, worksheet.creator),
        assignedClassrooms: classrooms.bind(this, worksheet.assignedClassrooms)
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
      classrooms: classrooms.bind(this, singleTeacher._doc.classrooms),
      worksheets: worksheets.bind(this, singleTeacher._doc.worksheets)
    };
  } catch (err) {
    throw err;
  }
};

exports.worksheets = worksheets;
exports.students = students;
exports.singleClassroom = singleClassroom;
exports.classrooms = classrooms;
exports.singleTeacher = singleTeacher;
