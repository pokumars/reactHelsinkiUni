import React, { useState, useEffect } from 'react';
import Note from './components/note';
import Notification from './components/Notification';
import noteService from './services/noteService';
import Footer from './components/Footer';


const App = () => {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState('');
    const [showAll, setShowAll] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);

    const hook = () => {
    console.log('effect')
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
    }
    useEffect(hook, []);

    //CREATE
    const addNote = (event)=> {
      event.preventDefault();

      const noteObject = {
        id: notes.length + 1,
        content: newNote,
        date: new Date().toISOString,
        important: Math.random > 0.5
      }

      noteService
        .create(noteObject)
        .then((returnedNote)=>{
          setNotes(notes.concat(returnedNote));
          setNewNote('');
          //console.log('post response...', response);
        })
    }


    //UPDATE toggles importance of this note. put request that will replace the note we just chnaged the importance of
    const toggleImportanceOf = id => {
      const note = notes.find((n)=> n.id === id);

      // creates a new object that is an exact copy of the old note object, apart from the important property
      const changedNote = { ...note, important: !note.important };

      //PUT request
      noteService
        .update(id, changedNote)
        .then((returnedNote )=>{
          //setNotes to be all the notes except the one with the id we just changed.
          //That should be replaced by the updated one we got from the put request's response.
          setNotes(notes.map(note => note.id !== id ? note : returnedNote));
        })
        .catch(error => {
          //show error notification for only 5 seconds
          setErrorMessage(`the note '${note.content}' was already deleted from server`);
          setTimeout(()=> {
            setErrorMessage(null);
          }, 5000);
          
          //reload notes and dont add the deleted one this time.
          setNotes(notes.filter(n => n.id !== id))
        });

      console.log('importance of '+ id +' needs to be toggled');
    }


    //controls the note input
    const handleNoteChange = (event) => {
      setNewNote(event.target.value);
    }

    //toggles whether to show all notes or only important notes
    const notesToShow = showAll ?
     notes:
     notes.filter(note => note.important === true);

     //gets the array of notes ot be displayed and displays them
    const rows = () => {
      return notesToShow.map(note => 
      <Note 
        key={note.id}
        note={note}
        toggleImportance={()=>toggleImportanceOf(note.id)} />);
    }

    

    return (
      <div>
        <h1>Notes</h1>
        <Notification message={errorMessage}/>
        <div>
          <button onClick={()=> setShowAll(!showAll)}>
            show {showAll? "important": "all"}
          </button>
        </div>

        <ul>
          {rows()}
        </ul>

        <form onSubmit={addNote}>
          <input
            value={newNote}
            onChange={handleNoteChange} />
          <button type="submit">Save</button>
        </form>

        <Footer />
      </div>
    )

}

export default App;
