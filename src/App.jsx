import React, { useState, useRef } from 'react'
import PianoKeyboard from './components/PianoKeyboard'
import Staff from './components/Staff'
import './App.css'

function App() {
  const [notes, setNotes] = useState([])
  const noteIdCounter = useRef(0)

  const handleKeyPress = (note) => {
    const newNote = { note, id: `note-${noteIdCounter.current++}-${Date.now()}` }
    setNotes(prevNotes => {
      const updated = [...prevNotes, newNote]
      console.log('Adding note:', note, 'Total notes now:', updated.length)
      return updated
    })
  }

  const handleStaffClick = (note) => {
    const newNote = { note, id: `note-${noteIdCounter.current++}-${Date.now()}` }
    setNotes(prevNotes => [...prevNotes, newNote])
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>The Professor's Keyboard</h1>
        <p>Click on the piano keys or the staff to play music! (2 Octaves: C4-C5)</p>
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

