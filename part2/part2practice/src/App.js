import React, { useState } from 'react';
import Note from './components/note';


const App = (props) => {
    const [notes, setNotes] = useState(props.notes);
    const [newNote, setNewNote] = useState('a new note...');
    const [showAll, setShowAll] = useState(true);

    const addNote = (event)=> {
      event.preventDefault();

      const noteObject = {
        id: notes.length + 1,
        content: newNote,
        date: new Date().toISOString,
        important: Math.random > 0.5
      }
      
      setNotes(notes.concat(noteObject));
      setNewNote('');
    }

    const handleNoteChange = (event) => {
      setNewNote(event.target.value);
    }

    const notesToShow = showAll ?
     notes:
     notes.filter(note => note.important === true);
  
    const rows = () => {
      return notesToShow.map(note => <Note key={note.id} note={note} />);
    }
    
  
  
    return (
      <div>
        <h1>Notes</h1>
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
      </div>
    )
    
}

export default App;