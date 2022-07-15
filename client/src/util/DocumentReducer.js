const DocumentReducer = (action, documentState, appState) => {
  const { document, setDocument, undoStack, setUndoStack, redoStack, setRedoStack } = documentState
  const { updateDisplayStates, newNote, setNewNote, selection, setSelection, notePosition, setNotePosition } = appState
  
  if (action.type!=='undo' && action.type!=='redo') {
    if (undoStack.length<110) {
      setUndoStack([...undoStack, structuredClone(document)])
    } else {
      setUndoStack([...undoStack.slice(10,undoStack.length), structuredClone(document)])
    }
  } else {
    if (action.type==='undo' && undoStack.length===0) return
    if (action.type==='redo' && redoStack.length===0) return
  }
  let nextDoc = []
  
  switch (action.type) {

    case 'setTimeSig':
      document[0].timeSig = action.payload
      break

    case 'setClef':
      document[0].clef = action.payload
      break

    case 'editNote':
      break

    case 'appendNote':
      const { beats, beatsType } = document[0].timeSig
      const requestedNote = action.payload

      // determine space available in measure
      const durationLookup = {
        eighth: 0.5,
        quarter: 1,
        half: 2,
        whole: 4
      }
      const spaceAvailable = beats/beatsType*4 - document[document.length-1].notes.reduce((sum, note) => { return sum + durationLookup[note.type]}, 0)
      if (spaceAvailable===0) {
        document.push({
          number: document.length,
          notes: [requestedNote]
        })
      // } else if (spaceAvailable < 0) {

      } else {
        document[document.length-1].notes.push(requestedNote)
      }
      break

    case 'measureInsert':
      const end = action.payload.mIdx===document.length
      const newNotes = [{type: 'whole', rest: null}]
      for (let i = 0; i < action.payload.insertMeasureCount; i++) {
        if (end) {
          document.push({notes: structuredClone(newNotes)})
        } else if (action.payload.mIdx===0) {
          document.splice(0, 0, structuredClone(document[0]))
          document[0].notes = structuredClone(newNotes)
          delete document[1].clef
          delete document[1].timeSig
          console.log(document.slice(0,2))
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
  
  setRedoStack([])
  updateDisplayStates(document)
}

export default DocumentReducer