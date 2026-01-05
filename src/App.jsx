import React, { useState } from 'react'
import PianoKeyboard from './components/PianoKeyboard'
import Staff from './components/Staff'
import './App.css'

function App() {
  const [activeNote, setActiveNote] = useState(null)

  const handleKeyPress = (note) => {
    setActiveNote(note)
  }

  const handleStaffClick = (note) => {
    setActiveNote(note)
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>The Professor's Keyboard</h1>
        <p>Click on the piano keys or the staff to play music!</p>
      </header>
      <div className="app-content">
        <Staff activeNote={activeNote} onStaffClick={handleStaffClick} />
        <PianoKeyboard activeNote={activeNote} onKeyPress={handleKeyPress} />
      </div>
    </div>
  )
}

export default App

