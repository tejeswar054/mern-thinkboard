import Note from '../models/Note.js';



export async function getAllNote(req, res) {
  try {
    const notes = await Note.find().sort({createdAt: -1}); 
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching notes' });
  }
}


export async function createNote(req, res) {
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title, content });
    await newNote.save(); // you forgot to save it!
    res.status(201).json(newNote);
  } catch (error) {
    res.status(500).json({ message: 'Error creating note' });
  }
}

export async function getNoteById(req, res) {
  try { 
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.json(note);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching note'
    });
  } 
}


export async function updateNote(req, res) {
  try {
    const {title, content} = req.body;
    const updatedNote = await Note.findByIdAndUpdate(req.params.id, { title, content }, { new: true });
    if (!updatedNote) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.json(updatedNote);
  } catch (error) {
    res.status(500).json({ message: 'Error updating note' });
  }
}


export async function deleteNote(req, res) {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.json({ message: 'Note deleted successfully' });
  }
  catch (error) {
    res.status(500).json({ message: 'Error deleting note' });
  }
}
