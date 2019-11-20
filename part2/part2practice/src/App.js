import React, { useState, useEffect } from 'react';
import Note from './components/note';
import Notification from './components/Notification';
import noteService from './services/noteService';
import Footer from './components/Footer';
import loginService from './services/login';
import LoginForm from './components/Loginform';
import NoteForm from './components/NoteForm';
import Togglable from './components/Togglable';


const App = () => {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState('');
    const [showAll, setShowAll] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);
    const noteFormRef = React.createRef();

    const hook = () => {
    console.log('effect')
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
    }
    useEffect(hook, []);

    const getBrowserTokenHook = () => {
      const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser');

      if(loggedUserJSON){
        const user = JSON.parse(loggedUserJSON);
        setUser(user);
        noteService.setToken(user.token);
      }
    }
    /* The empty array as the parameter of the effect ensures that the effect is
     executed only when the component is rendered for the first time.*/
    useEffect(getBrowserTokenHook, []);

    const handleLogin =async (event) => {
      event.preventDefault();
      try {
        const user = await loginService.login({
          username, password
        });

        window.localStorage.setItem(
          'loggedNoteappUser', JSON.stringify(user)
        );

        noteService.setToken(user.token);
        setUser(user);
        setUsername('');
        setPassword('');
        
      } catch (error) {
        setErrorMessage('Wrong Credentials');
        setTimeout(() => {

        }, 5000);
      }
    }

    //CREATE
    const addNote = (event)=> {
      event.preventDefault();

      noteFormRef.current.toggleVisibility();

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

    const loginForm= () => {

      return (
          <Togglable buttonLabel='login form'>
            <LoginForm username={username} password={password}
              handleLogin={handleLogin} 
              handleUsernameChange={(value) => setUsername(value)}
              handlePasswordChange={(value) => setPassword(value)} />
          </Togglable>
      )
    }

    const noteForm = ()=> (
      <Togglable buttonLabel="new note" ref={noteFormRef}>
        <NoteForm 
          addNote={addNote}
          newNote={newNote}
          handleNoteChange={handleNoteChange}
        />

      </Togglable>
    )
    

    return (
      <div>
        <h1>Notes</h1>
        <Notification message={errorMessage}/>
        {user === null
        ? loginForm()
        : <div>
          <p> {user.name} is logged in</p>
          {noteForm()}
          </div>}

        <div>
          <button onClick={()=> setShowAll(!showAll)}>
            show {showAll? "important": "all"}
          </button>
        </div>

        <ul>
          {rows()}
        </ul>

        

        <Footer />
      </div>
    )

}

export default App;
