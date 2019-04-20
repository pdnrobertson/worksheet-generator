const Worksheet = require("../../models/Worksheet");
const TeacherUser = require("../../models/TeacherUser");

const { singleTeacher } = require("./merge");

const worksheetQueries = {};

const worksheetMutations = {
  createWorksheet: async (_, args, context) => {
    // Check if authenticated
    // if (!context.user) {
    //   throw new Error("Unauthenticated.");
    // }

    let createdWorksheet;

    // Extract input arguments
    const { title, creatorId } = args.worksheetInput;

    try {
      // Find teacher
      const teacher = await TeacherUser.findById(creatorId);

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
    } catch (err) {}
  }
};

exports.worksheetQueries = worksheetQueries;
exports.worksheetMutations = worksheetMutations;
