import React, { useEffect, useRef } from 'react'
import { playNote, noteFrequencies } from '../utils/audio'
import { getAllNotes } from '../utils/notes'
import './PianoKeyboard.css'

const PianoKeyboard = ({ activeNote, onKeyPress }) => {
  const keysRef = useRef({})

  useEffect(() => {
    if (activeNote && keysRef.current[activeNote]) {
      const keyElement = keysRef.current[activeNote]
      keyElement.classList.add('pressed')
      
      // Play the note
      const frequency = noteFrequencies[activeNote]
      if (frequency) {
        playNote(frequency)
      }
      
      // Remove pressed class after animation
      setTimeout(() => {
        keyElement.classList.remove('pressed')
      }, 200)
    }
  }, [activeNote])

  const handleKeyClick = (note) => {
    onKeyPress(note)
  }

  const isBlackKey = (note) => {
    return note.includes('#')
  }

  const getKeyLabel = (note) => {
    // Show only C notes on white keys for cleaner look
    if (!isBlackKey(note) && note.startsWith('C')) {
      return note
    }
    return ''
  }

  const allNotes = getAllNotes()
  // Debug: Verify we only have C4 and C5 octaves
  React.useEffect(() => {
    const octaves = [...new Set(allNotes.map(n => n.match(/\d+/)?.[0]))]
    console.log('Piano Keyboard - Total notes:', allNotes.length)
    console.log('Piano Keyboard - Octaves:', octaves)
    console.log('Piano Keyboard - First note:', allNotes[0])
    console.log('Piano Keyboard - Last note:', allNotes[allNotes.length - 1])
  }, [])
  
  const whiteKeys = allNotes.filter(note => !isBlackKey(note))
  const blackKeys = allNotes.filter(note => isBlackKey(note))

  // Calculate black key positions relative to white keys
  const getBlackKeyPosition = (blackNote) => {
    const noteIndex = allNotes.indexOf(blackNote)
    const whiteKeyIndex = whiteKeys.findIndex(whiteNote => {
      const whiteIndex = allNotes.indexOf(whiteNote)
      return whiteIndex > noteIndex
    })
    return whiteKeyIndex - 0.5
  }

  return (
    <div className="piano-container">
      <div className="piano-keyboard">
        {/* White keys */}
        <div className="white-keys">
          {whiteKeys.map((note) => (
            <div
              key={note}
              ref={(el) => (keysRef.current[note] = el)}
              className="white-key"
              onClick={() => handleKeyClick(note)}
              title={note}
            >
              <span className="key-label">{getKeyLabel(note)}</span>
            </div>
          ))}
        </div>
        
        {/* Black keys */}
        <div className="black-keys">
          {blackKeys.map((note) => (
            <div
              key={note}
              ref={(el) => (keysRef.current[note] = el)}
              className="black-key"
              onClick={() => handleKeyClick(note)}
              style={{
                left: `${(getBlackKeyPosition(note) / whiteKeys.length) * 100}%`
              }}
              title={note}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default PianoKeyboard

