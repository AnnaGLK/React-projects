import { useState } from "react";
import { Modal, Text, Title, Button, Group } from "@mantine/core";
import './App.css'

const NotesApp = () => {
  const [noteText, setNoteText] = useState("");
  const [noteTitle, setNoteTitle] = useState("");
  const [notes, setNotes] = useState([]);
  const [opened, setOpened] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  
  const addNote = () => {
    if (!noteText.trim()) return;

    const newNote = {
      title: noteTitle.trim(),
      text: noteText.trim(),
      date: formatDate(new Date()),
      updatedAt: null 
    };
    setNotes([newNote, ...notes]);
    setNoteTitle("");
    setNoteText("");
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
            updatedAt: formatDate(new Date()),
          }
          : n
      )
    );
    setOpened(false);
    setIsEditing(false);
    setNoteTitle("");
    setNoteText("");
    setSelectedNote(null);
  };

  const closeModal = () => { // *** CHANGED - extracted function
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
        <Group mt="md">
          <Button onClick={saveEditedNote}>Save</Button>
          <Button variant="outline"  onClick={closeModal}>
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
          <div className="note-card" key={index} onClick={() => openNote(note, index)}>
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
          </div>
        ))}
      </div>

    </div>
  );
};

export default NotesApp;