const Worksheet = require("../../models/Worksheet");
const TeacherUser = require("../../models/TeacherUser");
const Classroom = require("../../models/Classroom");

const { singleTeacher } = require("./merge");

const worksheetQueries = {};

const worksheetMutations = {
  createWorksheet: async (_, args, context) => {
    // Check if authenticated
    if (!context.user) {
      throw new Error("Unauthenticated.");
    }

    let createdWorksheet;

    // Extract input arguments
    const { title, creatorId } = args.worksheetInput;

    try {
      // Find teacher
      const teacher = await TeacherUser.findById(creatorId);

      if (!teacher) {
        throw new Error("Teacher not found.");
      }

      // Create new mongo worksheet
      const worksheet = await new Worksheet({
        title,
        creator: creatorId,
        dateCreated: new Date()
      });

      // Save the worksheet in the database
      const result = await worksheet.save();

      // Add worksheet to list of teachers worksheet
      teacher.createdWorksheets.push(worksheet);
      await teacher.save();

      // Return worksheet for GraphQL
      return (createdWorksheet = {
        ...worksheet._doc,
        creator: singleTeacher.bind(this, result._doc.creator)
      });
    } catch (err) {
      throw err;
    }
  },

  deleteWorksheet: async (_, args, context) => {
    try {
      const worksheet = await Worksheet.findById(args.worksheetId);
      const teacher = await TeacherUser.findById(context.user.id);

      // Check to see if worksheet and teacher exists
      if (!worksheet) {
        throw new Error("Worksheet not found.");
      }

      if (!teacher) {
        throw new Error("Teacher not found.");
      }

      // Check to see if user is authorised
      if (worksheet.creator.toString() !== context.user.id) {
        throw new Error("Not authorised to delete this worksheet.");
      }

      // Delete worksheet from assigned classrooms
      worksheet.assignedClassrooms.forEach(async classroom => {
        const foundClassroom = await Classroom.findById(classroom.toString());
        foundClassroom.assignedWorksheets = foundClassroom.assignedWorksheets.filter(
          assignedWorksheet => {
            return (
              assignedWorksheet._id.toString() !== worksheet._id.toString()
            );
          }
        );
        await foundClassroom.save();
        return;
      });

      // Remove worksheet from database
      await worksheet.remove();

      // Remove worksheet from teachers worksheet
      teacher.createdWorksheets = teacher.createdWorksheets.filter(
        keepWorksheet => keepWorksheet._id.toString() !== args.worksheetId
      );

      await teacher.save();

      return "Deleted";
    } catch (err) {
      throw err;
    }
  }
};

exports.worksheetQueries = worksheetQueries;
exports.worksheetMutations = worksheetMutations;
