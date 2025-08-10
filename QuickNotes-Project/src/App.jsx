import { useState } from "react";
import './App.css'

const NotesApp = () => {
  const [noteText, setNoteText] = useState("");
  const [notes, setNotes] = useState([]);

  const addNote = () => {
    if (!noteText.trim()) return;
    const newNote = {
      text: noteText.trim(),
      date: new Date().toLocaleString()
    };
    setNotes([newNote, ...notes]);
    setNoteText("");
  };

  return (
    <div className="notes-container">
      <h2>My Notes</h2>
      <textarea
        rows="4"
        placeholder="Write your note here..."
        value={noteText}
        onChange={(e) => setNoteText(e.target.value)}
      />
      <button onClick={addNote}>Add Note</button>

      <div className="notes-grid">
        {notes.map((note, index) => (
          <div className="note-card" key={index}>
            <p>{note.text}</p>
            <span className="note-date">{note.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotesApp;