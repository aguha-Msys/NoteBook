const mongoose = require("mongoose");
module.exports = mongoose.model(
  "Note",
  new mongoose.Schema(
    {
      userId: { type: mongoose.Schema.Types.ObjectId, required: true },
      noteId: { type: Number, required: true, unique: true },
      noteTitle: { type: String, required: true },
      noteSubTitle: { type: String, required: true },
      noteBody: { type: String, required: true },
      starred: { type: Boolean, default: false },
      iAt: { type: Date, required: true },
    },
    { collection: "Note" }
  )
);
