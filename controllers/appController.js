const Note = require("../models/Note");
const genId = require("../middlewares/genId");

exports.getNotes = async (req, res, next) => {
  const user = req.user;
  await Note.find().then((notes) => {
    //res.render("app/notes", { pageTitle: "Notes", notes });
    res.render("app/home", { pageTitle: "Home", notes, user });
  });
};

exports.getAddNotes = (req, res, next) => {
  const user = req.user;
  res.render("app/addNote", { pageTitle: "Add Note", user });
};

exports.getSearch = async (req, res, next) => {
  const user = req.user;
  const searchBox = req.query.searchBox;
  if (Number(searchBox)) {
    await Note.find({
      $or: [{ noteId: searchBox }],
    })
      .then((notes) => {
        console.log(notes);
        res.render("app/home", {
          notes: notes,
          pageTitle: "Notes",
          user,
        });
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  } else {
    const escapedSearchBox = searchBox.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const searchRegex = new RegExp(escapedSearchBox, "i");

    
     // Create a case-insensitive regular expression

    // console.log("searchkey-->"+searchRegex);
    await Note.find({
      $or: [
        { noteTitle: searchRegex },
        { noteSubTitle: searchRegex },
        { noteBody: searchRegex },
      ],
    })
      .then((note) => {
        //console.log(note);
        res.render("app/home", {
          notes: note,
          pageTitle: "Notes",
          user,
        });
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  }
};

exports.postAddNotes = async (req, res, next) => {
  const { noteTitle, noteSubTitle, noteBody } = req.body;
  const iAt = Date.now();
  const noteId = await genId();
  try {
    const newNote = new Note({
      userId: req.user.id,
      noteId,
      noteTitle,
      noteSubTitle,
      noteBody,
      iAt,
    });
    await newNote.save();
    await Note.find().then((note) => {
      //res.json({ note });
      res.redirect("/");
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getEditNotes = async (req, res, next) => {
  const user = req.user;
  const noteId = req.params.noteId;
  // console.log(noteId);
  try {
    await Note.findOne({ noteId }).then((note) => {
      res.render("app/updateNote", {
        pageTitle: "Edit",
        note,
        user,
      });
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.postEditNotes = async (req, res, next) => {
  const noteId = req.params.noteId;
  //const { noteTitle, noteBody, noteSubTitle } = req.body;
  const fields = req.body;
  try {
    const updatedNote = await Note.findOneAndUpdate(
      { noteId },
      { $set: /*{ noteTitle, noteBody, noteSubTitle }*/ fields },
      { new: true }
    );
    if (!updatedNote) {
      return res.status(404).json({ error: "Note not found" });
    }
    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

exports.deleteNotes = async (req, res, next) => {
  // console.log("entrydel");
  const noteId = req.params.noteId;
  // console.log("noteId="+noteId);
  try {
    const deleteNote = await Note.findOneAndDelete({ noteId });
    res.redirect("/");
    // console.log("exitdel");
  } catch (error) {
    console.log(error);
  }
};

exports.searchByIdAndKeywords = (req, res, next) => {
  res.json({ note });
};

exports.getStarred = (req, res, next) => {
  const user = req.user;
  Note.find({ starred: true })
    .then((notes) => {
      res.render("app/home", {
        notes: notes,
        pageTitle: "Notes",
        user,
      });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

exports.postStarSetTrue = async (req, res, next) => {
  console.log("entrystart");
  const noteId = req.params.noteId;
  // console.log("star_noteId="+noteId);
  try {
    const UpdateNote = await Note.findOneAndUpdate(
      { noteId },
      { $set: { starred: "true" } }
    );
    res.redirect("/");
    // console.log("exitstar");
  } catch (error) {
    console.log(error);
  }
};

exports.postStarSetFalse = async (req, res, next) => {
  const noteId = req.params.noteId;
  try {
    const UpdateNote = await Note.findOneAndUpdate(
      { noteId },
      { $set: { starred: "false" } }
    );
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};
