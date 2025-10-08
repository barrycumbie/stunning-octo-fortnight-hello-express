import Note from '../models/Note.js';

export const getNotes = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const notes = await Note.find({ pageNumber: page }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    console.error('Error in getNotes:', err);
    res.status(500).json({ error: 'Failed to fetch notes' });
  }
};

// make new note
export const createNote = async (req, res) => {
  try {
    const { title, content, pageNumber } = req.body;
    if (!title || !content || !pageNumber) {
      return res.status(400).json({ error: 'title, content, and pageNumber are required' });
    }

    const note = await Note.create({ title, content, pageNumber });
    res.status(201).json(note);
  } catch (err) {
    console.error('Error in createNotes:', err);
    res.status(500).json({ error: 'Failed to create note' });
  }
};

//update note
export const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const updated = await Note.findByIdAndUpdate(
      req.params.id,
      { ...(title && { title }), ...(content && { content }) },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: 'Note not found' });
    res.json(updated);
  } catch (err) {
    console.error('Error in updateNote:', err);
    res.status(500).json({ error: 'Failed to update note' });
  }
};

// delete note
export const deleteNote = async (req, res) => {
  try {
    const deleted = await Note.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Note not found' });
    res.json({ message: 'Note deleted successfully' });
  } catch (err) {
    console.error('Error in deleteNote:', err);
    res.status(500).json({ error: 'Failed to delete note' });
  }
};
