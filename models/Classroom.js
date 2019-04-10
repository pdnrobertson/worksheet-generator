const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClassroomSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  year_level: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: false
  },
  teacher: {
    type: Schema.Types.ObjectId,
    ref: "Teacher",
    required: true
  },
  numOfStudents: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("Classroom", ClassroomSchema);
