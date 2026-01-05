// Mapping between staff positions and note names
// Staff positions: 0 = bottom line, 1 = bottom space, 2 = second line, etc.
// Each staff has 5 lines and 4 spaces, plus ledger lines above/below

export const staffToNote = (staffPosition, clef = 'treble') => {
  // Treble clef: E4 is on the first line, F4 is first space, G4 is second line, etc.
  // Bass clef: G2 is on the first line, A2 is first space, B2 is second line, etc.
  
  if (clef === 'treble') {
    const trebleNotes = [
      'C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5', 'D5', 'E5', 'F5', 'G5', 'A5', 'B5', 'C6'
    ]
    // Map staff position to note (0 = C4, 1 = D4, etc.)
    const index = Math.max(0, Math.min(staffPosition, trebleNotes.length - 1))
    return trebleNotes[index]
  } else {
    const bassNotes = [
      'C2', 'D2', 'E2', 'F2', 'G2', 'A2', 'B2', 'C3', 'D3', 'E3', 'F3', 'G3', 'A3', 'B3', 'C4'
    ]
    const index = Math.max(0, Math.min(staffPosition, bassNotes.length - 1))
    return bassNotes[index]
  }
}

export const noteToStaffPosition = (noteName, clef = 'treble') => {
  // For sharps, find the nearest natural note position
  if (noteName.includes('#')) {
    // Get the base note (e.g., C# -> C)
    const baseNote = noteName.replace('#', '')
    const octave = noteName.match(/\d+/)?.[0] || '4'
    const naturalNote = `${baseNote}${octave}`
    const position = noteToStaffPosition(naturalNote, clef)
    // Sharps are slightly offset (we'll handle this in the Staff component)
    return position
  }
  
  if (clef === 'treble') {
    const trebleNotes = [
      'C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5', 'D5', 'E5', 'F5', 'G5', 'A5', 'B5', 'C6'
    ]
    return trebleNotes.indexOf(noteName)
  } else {
    const bassNotes = [
      'C2', 'D2', 'E2', 'F2', 'G2', 'A2', 'B2', 'C3', 'D3', 'E3', 'F3', 'G3', 'A3', 'B3', 'C4'
    ]
    return bassNotes.indexOf(noteName)
  }
}

// Get all notes for C4 and C5 octaves only (C4-B4 and C5-B5)
// Version: 2-octaves-only - Only returns C4 and C5 octaves
export const getAllNotes = () => {
  const notes = []
  // STRICTLY only C4 and C5 octaves - no other octaves
  const octaves = [4, 5]
  const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
  
  octaves.forEach(octave => {
    noteNames.forEach(note => {
      notes.push(`${note}${octave}`)
    })
  })
  
  // Verify: should return exactly 24 notes (12 per octave)
  // C4-B4 (12 notes) + C5-B5 (12 notes) = 24 total
  return notes
}

