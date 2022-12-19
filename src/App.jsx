import { useState } from 'react'
import './App.css'

let currentId = 0;

function App() {
  const [notes, setNotes] = useState([]);
  const [inputValue, setInputValue] = useState('');

  function handleChange(event) {
    setInputValue(event.target.value);
  }

  function save() {
    setNotes(prev => {
      const newID = currentId + 1;
      currentId = newID;
      return [
        ...prev,
        {
          id: newID,
          body: inputValue
        }
      ]
    });

    setInputValue('');
  }

  function deleteNote(id) {
    console.log('deleting');
    setNotes(prev => {
      const noteIndexToDelete = prev.findIndex((note) => note.id === id);
      const currentNotes = [...prev];
      currentNotes.splice(noteIndexToDelete, 1);
      return [...currentNotes];
    });
  }

  function editNote(id) {
    console.log('editing');
    
    setNotes((prev) => {
      const currentNotes = [...prev];
      const noteToEdit = currentNotes.find((note) => note.id === id);
      noteToEdit.id = id
      noteToEdit.body = inputValue;
      return currentNotes;
    });
  }

  return (
    <>
      <div className="App">
        <header>Notes</header>
      </div>

      <section>
        <div className='contact-main'>
          <div className='contact-input'>
            <input type='text' value={inputValue} onChange={handleChange}></input>
            <button type="button" onClick={save}>Save</button>
            {notes.map(note => {
              return (
                <div key={note.id}>

                  <div className='note-body'>{note.body}</div>

                  <button type="button" onClick={() => {
                    console.log('delete button');
                    deleteNote(note.id);
                  }}>delete</button>

                  <button type='button' onClick={() => {
                    console.log('edit button');
                    editNote(note.id);
                  }}>edit</button>

                </div>
              );
            })}
            
          </div>

        </div>
      </section>
    </>
  )
}

export default App
