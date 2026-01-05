import React, { useState } from 'react'
import PianoKeyboard from './components/PianoKeyboard'
import Staff from './components/Staff'
import './App.css'

function App() {
  const [notes, setNotes] = useState([])

  const handleKeyPress = (note) => {
    setNotes(prevNotes => [...prevNotes, { note, id: Date.now() + Math.random() }])
  }

  const handleStaffClick = (note) => {
    setNotes(prevNotes => [...prevNotes, { note, id: Date.now() + Math.random() }])
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>The Professor's Keyboard</h1>
        <p>Click on the piano keys or the staff to play music!</p>
        <button 
          onClick={() => setNotes([])} 
          className="clear-button"
          disabled={notes.length === 0}
        >
          Clear Staff ({notes.length})
        </button>
      </header>
      <div className="app-content">
        <Staff notes={notes} onStaffClick={handleStaffClick} />
        <PianoKeyboard activeNote={notes[notes.length - 1]?.note} onKeyPress={handleKeyPress} />
      </div>
    </div>
  )
}

export default App

