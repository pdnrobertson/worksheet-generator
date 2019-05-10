const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TeacherUserSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },

  lastName: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },

  school: {
    type: String,
    required: true
  },

  country: {
    type: String,
    required: false
  },

  password: {
    type: String,
    required: true
  },

  classrooms: [
    {
      type: Schema.Types.Object,
      ref: "Classroom"
    }
  ],

  createdWorksheets: [
    {
      type: Schema.Types.Object,
      ref: "Worksheet"
    }
  ]
});

module.exports = mongoose.model("Teacher", TeacherUserSchema);
