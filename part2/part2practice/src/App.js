import React from 'react';
import Note from './components/note';


const App = (props) => {
    const { notes } = props;
  
    const rows = () => {
      return notes.map(note => <Note key={note.id} note={note} />);
    }
    
  
  
    return (
      <div>
        <h1>Notes</h1>
        <ul>
          {rows()}
        </ul>
      </div>
    )
    
}

export default App;