import React, { useState } from "react";
import "./Main.css";
import getNotes from "@wasp/queries/getNotes";
import { useQuery } from "@wasp/queries";
import createNote from "@wasp/actions/createNote";
import updateNote from "@wasp/actions/updateNote";
import deleteNote from "@wasp/actions/deleteNote";

const MainPage = () => {
  const { data: notes, isFetching, error } = useQuery(getNotes);

  return (
    <div className="notes-container">
      <h1 className="notes-title">Notes📒</h1>
      <NewNoteForm />
      {notes && <NotesList notes={notes} />}

      {isFetching && "Fetching..."}
      {error && "Error: " + error}
    </div>
  );
};

const Note = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(props.note.content);

  const handleContentChange = async (content) => {
    try {
      await updateNote({
        noteId: props.note.id,
        data: { content },
      });
    } catch (error) {
      window.alert("Error while updating task: " + error.message);
    }
  };

  const handleInputChange = (event) => {
    setValue(event.target.value);
  };

  const handleInputBlur = async () => {
    setIsEditing(false);
    await handleContentChange(value);
  };

  const handleInputClick = () => {
    setIsEditing(true);
  };

  const handleDeleteNote = async () => {
    try {
      await deleteNote({
        noteId: props.note.id,
      });
    } catch (error) {
      window.alert("Error while deleting note: " + error.message);
    }
  };

  return (
    <div className="note-item">
      <button className="note-delete" onClick={handleDeleteNote}>X</button>
      {isEditing ? (
        <input
          className="note-content"
          type="text"
          value={value}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
        />
      ) : (
        <div className="note-content" onClick={handleInputClick}>
          {value}
        </div>
      )}
    </div>
  );
};

const NotesList = (props) => {
  if (!props.notes?.length) return "No Notes";
  return (
    <div className="notes-list">
      {props.notes.map((note, idx) => (
        <Note note={note} key={idx} />
      ))}
    </div>
  );
};

const NewNoteForm = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const content = event.target.content.value;
      event.target.reset();
      await createNote({ content });
    } catch (err) {
      window.alert("Error: " + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="content"
        className="note-input"
        type="text"
        placeholder="New note.."
        defaultValue=""
      />
      <input type="submit" className="save-btn" value="Add" />
    </form>
  );
};

export default MainPage;
