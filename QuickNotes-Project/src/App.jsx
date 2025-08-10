import { useState } from "react";
import './App.css'

const NotesApp = () => {
  const [noteText, setNoteText] = useState("");
  const [noteTitle, setNoteTitle] = useState("");
  const [notes, setNotes] = useState([]);

  const addNote = () => {
    if (!noteText.trim()) return;
    
    const newNote = {
      title: noteTitle.trim(),
      text: noteText.trim(),
      date: formatDate(new Date())
    };
    setNotes([newNote, ...notes]);
    setNoteTitle("");
    setNoteText("");
  };

  const deleteNote = (index) => {
    if (confirm("Are you sure you want to delete your note?")) {
      setNotes(notes.filter((_, i) => i !== index));
    }
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true
    }).format(date);
  };

  return (
    <div className="notes-container">
      <div className="container">
        <h2>My Notes</h2>
        <input
          placeholder="Note title"
          value={noteTitle}
          onChange={(e) => setNoteTitle(e.target.value)}
        />
        <textarea
          rows="4"
          placeholder="Write your note here..."
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
        />
        <button onClick={addNote}>Add Note</button>
      </div>
      <div className="notes-grid">
        {notes.map((note, index) => (
          <div className="note-card" key={index}>
            <div className="note-header">
              <span className="note-date">{note.date}</span>
              <button
                className="delete-btn"
                onClick={() => deleteNote(index)}
              >
                X
              </button>
            </div>
           
            {note.title && <h3>{note.title}</h3>}
            <p>{note.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotesApp;