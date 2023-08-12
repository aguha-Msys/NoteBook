const Note = require("../models/Note");
async function genId() {
  try {
    const lastNote = await Note.findOne().sort({ noteId: -1 }).exec(); // Sort the collection in decending order and fetch the latest id
    //console.log(lastNote);
    const newId = lastNote ? lastNote.noteId + 1 : 1; // Increment Id if present else initialise with 1
    return newId;
  } catch (error) {
    console.log(error);
  }
}
module.exports = genId;
