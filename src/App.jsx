import React, { useState } from 'react'
import PianoKeyboard from './components/PianoKeyboard'
import Staff from './components/Staff'
import './App.css'

function App() {
  const [notes, setNotes] = useState([])

  const handleKeyPress = (note) => {
    setNotes(prevNotes => [...prevNotes, note])
  }

  const handleStaffClick = (note) => {
    setNotes(prevNotes => [...prevNotes, note])
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>The Professor's Keyboard</h1>
        <p>Click on the piano keys or the staff to play music!</p>
        {notes.length > 0 && (
          <button 
            onClick={() => setNotes([])} 
            className="clear-button"
          >
            Clear Staff
          </button>
        )}
      </header>
      <div className="app-content">
        <Staff notes={notes} onStaffClick={handleStaffClick} />
        <PianoKeyboard activeNote={notes[notes.length - 1]} onKeyPress={handleKeyPress} />
      </div>
    </div>
  )
}

export default App

