import { useState, useEffect } from "react";
import { Modal, Text, Title, Button, Group } from "@mantine/core";
import './App.css'


const categoryColors = { // predefined colors
  Personal: "#fce4ec",
  Work: "#e3f2fd",
  Ideas: "#e8f5e9",
  Other: "#fff8e1",
};

const NotesApp = () => {
  const [noteText, setNoteText] = useState("");
  const [noteTitle, setNoteTitle] = useState("");
  const [notes, setNotes] = useState([]);
  const [noteCategory, setNoteCategory] = useState("Personal");
  const [opened, setOpened] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Load notes from localStorage on mount
  useEffect(() => {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  // Save notes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (!noteText.trim()) return;

    const newNote = {
      title: noteTitle.trim(),
      text: noteText.trim(),
      category: noteCategory,
      date: formatDate(new Date()),
      updatedAt: null
    };
    setNotes([newNote, ...notes]);
    setNoteTitle("");
    setNoteText("");
    setNoteCategory("Personal");
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

  const deleteNote = (index) => {
    if (confirm("Are you sure you want to delete your note?")) {
      setNotes(notes.filter((_, i) => i !== index));
    }
  };

  const openNote = (note, index) => {
    setSelectedNote({ ...note, index });
    setNoteTitle(note.title);
    setNoteText(note.text);
    setNoteCategory(note.category);
    setIsEditing(true);
    setOpened(true);
  };

  const saveEditedNote = () => {
    setNotes((prevNotes) =>
      prevNotes.map((n, i) =>
        i === selectedNote.index
          ? {
            ...n,
            title: noteTitle.trim(),
            text: noteText.trim(),
            category: noteCategory,
            updatedAt: formatDate(new Date()),
          }
          : n
      )
    );
    setOpened(false);
    setIsEditing(false);
    setNoteTitle("");
    setNoteText("");
    setNoteCategory("Personal");
    setSelectedNote(null);
  };

  const closeModal = () => {
    setOpened(false);
    setIsEditing(false);
    setSelectedNote(null);
    setNoteTitle("");
    setNoteText("");
  };

  return (
    <div className="notes-container">
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title={selectedNote?.title || "Note Details"}
        centered
        overlayProps={{
          opacity: 0.55,
          blur: 3,
        }}
      >
        {isEditing ? (
          <>

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
            <select
              value={noteCategory}
              onChange={(e) => setNoteCategory(e.target.value)}
              style={{ width: "100%", marginBottom: "10px" }}
            >
              {Object.keys(categoryColors).map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <Group mt="md">
              <Button onClick={saveEditedNote}>Save</Button>
              <Button variant="outline" onClick={closeModal}>
                Cancel
              </Button>
            </Group>

          </>
        ) : (
          selectedNote && (
            <>
              <Text size="sm" color="dimmed">
                Created: {selectedNote.date}
              </Text>
              {selectedNote.updatedAt && (
                <Text size="sm">
                  Updated: {selectedNote.updatedAt}
                </Text>
              )}
              <Title order={3} mt="sm">{selectedNote.title}</Title>
              <Text mt="xs">{selectedNote.text}</Text>
            </>
          )
        )}
      </Modal>

      {/* Add note form */}

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
        <select
          value={noteCategory}
          onChange={(e) => setNoteCategory(e.target.value)}
        >
          {Object.keys(categoryColors).map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <button onClick={addNote}>Add Note</button>
      </div>

      {/* Notes grid */}

      <div className="notes-grid">
        {notes.map((note, index) => (
          <div className="note-card"
            key={index}
            onClick={() => openNote(note, index)}
            style={{ backgroundColor: categoryColors[note.category] }}
          >
            <div className="note-header">
              <span className="note-date">{note.date}</span>
              <button
                className="delete-btn"
                onClick={(e) => { e.stopPropagation(); deleteNote(index); }}
              >
                X
              </button>
            </div>

            {note.title && <h3>{note.title}</h3>}
            <p>{note.text}</p>
            <small>Category: {note.category}</small>
          </div>
        ))}
      </div>

    </div>
  );
};

export default NotesApp;