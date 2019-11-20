import React from 'react';

const NoteForm = (props) => {
  const {addNote, newNote, handleNoteChange} = props

  return (
    <form onSubmit={addNote}>
      <input
        value={newNote}
        onChange={handleNoteChange} />
      <button type="submit">save note</button>
    </form>
  );
}

export default NoteForm;