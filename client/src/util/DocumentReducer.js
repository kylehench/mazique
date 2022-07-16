const DocumentReducer = (action, documentState, appState) => {
  const { document, setDocument, undoStack, setUndoStack, redoStack, setRedoStack } = documentState
  const { updateDisplayStates, newNote, setNewNote, selection, setSelection, notePosition, setNotePosition } = appState
  let documentAttributes = {}
  
  if (action.type!=='undo' && action.type!=='redo') {
    if (undoStack.length<110) {
      setUndoStack([...undoStack, structuredClone(document)])
    } else {
      setUndoStack([...undoStack.slice(10,undoStack.length), structuredClone(document)])
    }
    documentAttributes = {timeSig: document[0].timeSig, clef: document[0].clef}
    delete document[0].timeSig
    delete document[0].clef
  } else {
    if (action.type==='undo' && undoStack.length===0) return
    if (action.type==='redo' && redoStack.length===0) return
  }
  let nextDoc = []
  
  switch (action.type) {

    case 'setTimeSig':
      documentAttributes.timeSig = action.payload
      break

    case 'setClef':
      documentAttributes.clef = action.payload
      break

    case 'writeNote':
      (() => {
        const { beats, beatsType } = documentAttributes.timeSig
        const note = action.payload.note
        let mIdx = selection.id.measure  // measure idx
        let nIdx = selection.id.note     // note idx
        let prevNote = structuredClone(document[mIdx].notes[nIdx])  // note being overwritten
        
        const durationLookup = {}
        const typeLookup = {}
        const noteTypes = ['whole', 'half', 'quarter', 'eighth']
        noteTypes.forEach((type, idx) => {
          durationLookup[type] = 1/(2**idx)
          typeLookup[1/(2**idx)] = durationLookup[type]
        })

        const noteDuration = durationLookup[note.type]
        let prevNoteDuration = durationLookup[prevNote.type]
        if (prevNote.dot===1) prevNoteDuration += prevNoteDuration/2
        let overflow = noteDuration-prevNoteDuration
        if (prevNote.dot!==undefined) delete prevNote.dot
        
        // overFlow = (-) (note shorter than prevNote), 0 (same length), or (+) (note longer than prevNote)
        if (overflow===0) {
          document[mIdx].notes[nIdx] = structuredClone(note)
          if (nIdx<document[mIdx].notes.length-1) {
            nIdx++
          } else if (mIdx<document.length-1) {
            mIdx++
            nIdx = 0
          }
          setSelection({id: {measure: mIdx, note: nIdx}, type: 'note', note})
        } else if (overflow<0) {
          document[mIdx].notes[nIdx] = structuredClone(note)
          nIdx++
          for (let [type, duration] of Object.entries(durationLookup)) {
            if (duration<= -overflow) {
              if (1.5*duration=== -overflow) {
                prevNote.dot = 1
                duration += duration/2
              }
              prevNote.type = type
              document[mIdx].notes.splice(nIdx, 0, structuredClone(prevNote))
              overflow += duration
            }
            if (overflow===0) setSelection({id: {measure: mIdx, note: nIdx}, type: 'note', note: prevNote})
            if (overflow===0) break
          }
        }
      })()
      break

    case 'measureInsert':
      const end = action.payload.mIdx===document.length
      const newNotes = [{type: 'whole', rest: {_measure: 'yes'}}]
      for (let i = 0; i < action.payload.insertMeasureCount; i++) {
        if (end) {
          document.push({notes: structuredClone(newNotes)})
        } else if (action.payload.mIdx===0) {
          document.splice(0, 0, structuredClone(document[0]))
          document[0].notes = structuredClone(newNotes)
          delete document[1].clef
          delete document[1].timeSig
        } else {
          document.splice(action.payload.mIdx, 0, {notes: structuredClone(newNotes)})
        }
      }
      break

    case 'measureDelete':
      // break if only one measure present
      if (document.length===1) break
      let mIdx = action.payload.id.measure
      document.splice(mIdx, 1)
      if (mIdx===document.length) mIdx--
      setSelection({id: {measure: mIdx, note: 0}, type: 'note', note: document[mIdx].notes[0]})
      break

    case 'undo':
      setRedoStack([...redoStack, document])
      nextDoc = undoStack.pop()
      setDocument(nextDoc)
      updateDisplayStates(nextDoc)
      return

    case 'redo':
      setUndoStack([...undoStack, document])
      nextDoc = redoStack.pop()
      setDocument(nextDoc)
      updateDisplayStates(nextDoc)
      return
      
    default:
      break
  }
  
  document[0] = {...document[0], timeSig: documentAttributes.timeSig, clef: documentAttributes.clef}
  setRedoStack([])
  updateDisplayStates(document)
}

export default DocumentReducer