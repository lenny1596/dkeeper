import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { dkeeper_backend } from "../../../declarations/dkeeper_backend";

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

  function addNote(newNote) {
    setNotes((prevNotes) => {
      dkeeper_backend.createNote(newNote.title, newNote.content);
      return [newNote, ...prevNotes]; // reverse the order of notes added to state & sent to backend.
    });
  }

  function deleteNote(id) {
    setNotes((prevNotes) => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
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
            id={index}
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
