import React from 'react'
import { noteToStaffPosition, staffToNote, getAllNotes } from '../utils/notes'
import { playNote, noteFrequencies } from '../utils/audio'
import './Staff.css'

const Staff = ({ notes, onStaffClick }) => {
  const svgRef = React.useRef(null)

  const staffHeight = 120
  const staffWidth = 800
  const lineSpacing = 20
  const staffTop = 50
  const clefWidth = 60
  const noteSpacing = 50 // Horizontal spacing between notes
  const noteStartX = clefWidth + 50 // Starting X position for notes

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

  const renderStaffLines = (width) => {
    const lines = []
    for (let i = 0; i < 5; i++) {
      const y = staffTop + i * lineSpacing
      lines.push(
        <line
          key={`line-${i}`}
          x1={clefWidth}
          y1={y}
          x2={width}
          y2={y}
          stroke="#000"
          strokeWidth="2"
        />
      )
    }
    return lines
  }


  const getNoteY = (note) => {
    if (!note) return staffTop + 2 * lineSpacing
    const position = noteToStaffPosition(note, 'treble')
    if (position === -1) return staffTop + 2 * lineSpacing
    return staffTop + (14 - position) * (lineSpacing / 2)
  }

  const renderNote = (note, index) => {
    const x = noteStartX + (index * noteSpacing)
    const y = getNoteY(note)
    const isSharp = note.includes('#')
    const noteRadius = 8

    return (
      <>
        {/* Ledger lines for this note */}
        {renderLedgerLinesForNote(y, x)}
        
        {/* Sharp symbol for sharp notes */}
        {isSharp && (
          <text
            x={x - 20}
            y={y + 5}
            fontSize="20"
            fill="#000"
            fontFamily="serif"
            fontWeight="bold"
          >
            ♯
          </text>
        )}
        
        {/* Quarter note head (filled circle) */}
        <circle
          cx={x}
          cy={y}
          r={noteRadius}
          fill="#000"
          className="staff-note"
        />
        
        {/* Quarter note stem - up for notes below middle line, down for notes above */}
        {y > staffTop + 2 * lineSpacing ? (
          // Stem goes up (for notes below middle line)
          <line
            x1={x + noteRadius}
            y1={y}
            x2={x + noteRadius}
            y2={y - 30}
            stroke="#000"
            strokeWidth="2"
            strokeLinecap="round"
          />
        ) : (
          // Stem goes down (for notes above middle line)
          <line
            x1={x + noteRadius}
            y1={y}
            x2={x + noteRadius}
            y2={y + 30}
            stroke="#000"
            strokeWidth="2"
            strokeLinecap="round"
          />
        )}
      </>
    )
  }

  const renderLedgerLinesForNote = (y, x) => {
    const lines = []
    const ledgerLineWidth = 25
    
    // Ledger lines above staff (for high notes)
    if (y < staffTop) {
      const ledgerCount = Math.ceil((staffTop - y) / lineSpacing)
      for (let i = 1; i <= ledgerCount; i++) {
        const ledgerY = staffTop - i * lineSpacing
        if (ledgerY < staffTop - 2 * lineSpacing) {
          lines.push(
            <line
              key={`ledger-above-${x}-${i}`}
              x1={x - ledgerLineWidth / 2}
              y1={ledgerY}
              x2={x + ledgerLineWidth / 2}
              y2={ledgerY}
              stroke="#000"
              strokeWidth="2"
            />
          )
        }
      }
    }
    
    // Ledger lines below staff (for low notes)
    if (y > staffTop + 4 * lineSpacing) {
      const ledgerCount = Math.ceil((y - (staffTop + 4 * lineSpacing)) / lineSpacing)
      for (let i = 1; i <= ledgerCount; i++) {
        const ledgerY = staffTop + 4 * lineSpacing + i * lineSpacing
        if (ledgerY > staffTop + 6 * lineSpacing) {
          lines.push(
            <line
              key={`ledger-below-${x}-${i}`}
              x1={x - ledgerLineWidth / 2}
              y1={ledgerY}
              x2={x + ledgerLineWidth / 2}
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

  // Calculate dynamic width based on number of notes
  const dynamicWidth = Math.max(staffWidth, noteStartX + (notes.length * noteSpacing) + 50)

  return (
    <div className="staff-container">
      <svg
        ref={svgRef}
        width={dynamicWidth}
        height={staffHeight + 100}
        className="staff-svg"
        onClick={handleStaffClick}
      >
        {/* Staff lines - extend to dynamic width */}
        {renderStaffLines(dynamicWidth)}
        
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
        
        {/* Render all notes */}
        {notes && notes.length > 0 && notes.map((noteObj, index) => {
          const note = typeof noteObj === 'string' ? noteObj : noteObj.note
          const id = typeof noteObj === 'string' ? index : noteObj.id
          return (
            <g key={`note-${id}`} className="staff-note-group">
              {renderNote(note, index)}
            </g>
          )
        })}
        
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

