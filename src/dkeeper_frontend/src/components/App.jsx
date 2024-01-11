import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { dkeeper_backend } from "../../../declarations/dkeeper_backend";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [notes, setNotes] = useState([]);

  // useEffect hook to run fetchNote method once on intial render
  useEffect(() => {
    fetchNote();
  }, []);

  // method to async fetch data from backend and update state.
  async function fetchNote() {
    const fetchedNotes = await dkeeper_backend.readNote();
    setNotes(fetchedNotes);
  }

  /* method to set unique id to new data
     call backend method and set newNote id, title & content
     also update the notes state variable by appending the new note
  */
  function addNote(newNote) {
    const noteId = uuidv4();
    newNote.id = noteId;
    setNotes((prevNotes) => {
      dkeeper_backend.createNote(newNote.id, newNote.title, newNote.content);
      return [newNote, ...prevNotes];
    });
  }

  // method to delete a note from backend as well as notes state variable
  function deleteNote(id) {
    dkeeper_backend.removeNote(id);
    setNotes((prevNotes) => {
      return prevNotes.filter((noteItem) => {
        return noteItem.id !== id;
      });
    });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={noteItem.id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
