import React, { useEffect, useRef } from 'react'
import { noteToStaffPosition, staffToNote, getAllNotes } from '../utils/notes'
import { playNote, noteFrequencies } from '../utils/audio'
import './Staff.css'

const Staff = ({ activeNote, onStaffClick }) => {
  const svgRef = useRef(null)
  const noteRef = useRef(null)

  const staffHeight = 120
  const staffWidth = 800
  const lineSpacing = 20
  const staffTop = 50
  const clefWidth = 60

  useEffect(() => {
    if (activeNote) {
      const position = noteToStaffPosition(activeNote, 'treble')
      if (noteRef.current && position !== -1) {
        updateNotePosition(position)
      }
    }
  }, [activeNote])

  const updateNotePosition = (position) => {
    if (!noteRef.current) return
    
    const y = staffTop + (14 - position) * (lineSpacing / 2)
    noteRef.current.setAttribute('cy', y)
    noteRef.current.style.opacity = '1'
    
    // Animate note appearance
    noteRef.current.style.transform = 'scale(1)'
  }

  const handleStaffClick = (event) => {
    if (!svgRef.current) return
    
    const rect = svgRef.current.getBoundingClientRect()
    const clickY = event.clientY - rect.top
    
    // Calculate which staff position was clicked
    const relativeY = clickY - staffTop
    const position = Math.round(relativeY / (lineSpacing / 2))
    const clampedPosition = Math.max(0, Math.min(14, position))
    
    const note = staffToNote(clampedPosition, 'treble')
    
    // Play the note
    const frequency = noteFrequencies[note]
    if (frequency) {
      playNote(frequency)
    }
    
    onStaffClick(note)
  }

  const renderStaffLines = () => {
    const lines = []
    for (let i = 0; i < 5; i++) {
      const y = staffTop + i * lineSpacing
      lines.push(
        <line
          key={`line-${i}`}
          x1={clefWidth}
          y1={y}
          x2={staffWidth}
          y2={y}
          stroke="#000"
          strokeWidth="2"
        />
      )
    }
    return lines
  }

  const renderLedgerLines = (y) => {
    const lines = []
    // Add ledger lines above staff (for high notes)
    if (y < staffTop) {
      const ledgerCount = Math.ceil((staffTop - y) / lineSpacing)
      for (let i = 1; i <= ledgerCount; i++) {
        const ledgerY = staffTop - i * lineSpacing
        if (ledgerY < staffTop - 2 * lineSpacing) {
          lines.push(
            <line
              key={`ledger-above-${i}`}
              x1={clefWidth + 20}
              y1={ledgerY}
              x2={clefWidth + 80}
              y2={ledgerY}
              stroke="#000"
              strokeWidth="2"
            />
          )
        }
      }
    }
    // Add ledger lines below staff (for low notes)
    if (y > staffTop + 4 * lineSpacing) {
      const ledgerCount = Math.ceil((y - (staffTop + 4 * lineSpacing)) / lineSpacing)
      for (let i = 1; i <= ledgerCount; i++) {
        const ledgerY = staffTop + 4 * lineSpacing + i * lineSpacing
        if (ledgerY > staffTop + 6 * lineSpacing) {
          lines.push(
            <line
              key={`ledger-below-${i}`}
              x1={clefWidth + 20}
              y1={ledgerY}
              x2={clefWidth + 80}
              y2={ledgerY}
              stroke="#000"
              strokeWidth="2"
            />
          )
        }
      }
    }
    return lines
  }

  const getNoteY = () => {
    if (!activeNote) return staffTop + 2 * lineSpacing
    const position = noteToStaffPosition(activeNote, 'treble')
    if (position === -1) return staffTop + 2 * lineSpacing
    return staffTop + (14 - position) * (lineSpacing / 2)
  }

  return (
    <div className="staff-container">
      <svg
        ref={svgRef}
        width={staffWidth}
        height={staffHeight + 100}
        className="staff-svg"
        onClick={handleStaffClick}
      >
        {/* Staff lines */}
        {renderStaffLines()}
        
        {/* Treble clef */}
        <text
          x="10"
          y={staffTop + 2.5 * lineSpacing}
          fontSize="80"
          fill="#000"
          fontFamily="serif"
        >
          𝄞
        </text>
        
        {/* Note */}
        {activeNote && (
          <>
            {renderLedgerLines(getNoteY())}
            {/* Sharp symbol for sharp notes */}
            {activeNote.includes('#') && (
              <text
                x={clefWidth + 35}
                y={getNoteY() + 5}
                fontSize="24"
                fill="#000"
                fontFamily="serif"
                fontWeight="bold"
              >
                ♯
              </text>
            )}
            <circle
              ref={noteRef}
              cx={clefWidth + 50}
              cy={getNoteY()}
              r="12"
              fill="#000"
              className="staff-note"
            />
          </>
        )}
        
        {/* Clickable areas for each staff position */}
        {getAllNotes().slice(0, 15).map((note, index) => {
          const y = staffTop + (14 - index) * (lineSpacing / 2)
          return (
            <rect
              key={`clickable-${note}`}
              x={clefWidth}
              y={y - lineSpacing / 4}
              width={staffWidth - clefWidth}
              height={lineSpacing / 2}
              fill="transparent"
              className="staff-clickable"
            />
          )
        })}
      </svg>
    </div>
  )
}

export default Staff

