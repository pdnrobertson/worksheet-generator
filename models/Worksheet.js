const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorksheetSchema = new Schema({
  title: {
    type: String,
    required: true
  },

  creator: {
    type: Schema.Types.ObjectId,
    ref: "Teacher",
    required: true
  },

  dateCreated: {
    type: Date,
    required: true
  },

  classroomsAssigned: [
    {
      type: Schema.Types.ObjectId,
      ref: "Classroom"
    }
  ]
});

module.exports = mongoose.model("Worksheet", WorksheetSchema);
