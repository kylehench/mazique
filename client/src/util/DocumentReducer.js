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
      const durationLookup = {}
      const typeLookup = {}
      const noteTypes = ['whole', 'half', 'quarter', 'eighth']
      noteTypes.forEach((type, idx) => {
        durationLookup[type] = 1/(2**idx)
        typeLookup[1/(2**idx)] = durationLookup[type]
      })
      
      const getDuration = (notes) => {
        // calculates duration of note(s). Accepts single note or array of notes.
        let duration = 0
        let totalDuration = 0
        if (!Array.isArray(notes)) notes = [notes]
        for (let note of notes) {
          duration = durationLookup[note.type]
          if (note.dot===1) duration += duration/2
          totalDuration += duration
        }
        return totalDuration
      }

      const setNextSelection = (mIdx, nIdx) => {
        // increments mIdx and/or nIdx to next note if not at last note
        if (nIdx<document[mIdx].notes.length-1) {
          nIdx++
        } else if (mIdx<document.length-1) {
          mIdx++
          nIdx = 0
        }
        setSelection({id: {measure: mIdx, note: nIdx}, type: 'note', note: document[mIdx].notes[nIdx]})
      }

      const fillDuration = (fillDuration, note) => {
        let newNotes = []
        let length = 0
        for (let [type, duration] of Object.entries(durationLookup)) {
          if (duration<=fillDuration-length) {
            let newNote = structuredClone(note)
            if (1.5*duration<=fillDuration-length) {
              newNote.dot = 1
              duration += duration/2
            } else if (newNote.dot!==undefined) delete newNote.dot
            newNote.type = type
            newNotes.push(newNote)
            length += duration
          }
          if (length===fillDuration) return newNotes.reverse()
        }
      }
      
      (() => {
        const note = action.payload.note
        let mIdx = selection.id.measure  // measure idx
        let nIdx = selection.id.note     // note idx
        let insertNotes = []             // array of notes
        
        let duration = getDuration(note)

        let insertedDuration = 0        // total duration of new note(s)
        let deletedDuration = 0         // duration of deleted notes.
        let deletedMeasureDuration = 0  // duration of deleted notes. resets at end of measure

        while (insertedDuration<duration) {
          // delete note to make space for new note. Save reference in case new note is shorter
          let prevNote = document[mIdx].notes.splice(nIdx, 1)[0]  // note being overwritten
          deletedDuration += getDuration(prevNote)
          deletedMeasureDuration += getDuration(prevNote)

          if (deletedDuration>=duration) {
            // if deleted duration at or exceeds requested note length, add remaining duration of note, resore remainder of last deleted note if necessary, and break
            insertNotes = fillDuration(duration-insertedDuration, note)
            document[mIdx].notes.splice(nIdx, 0, ...insertNotes)
            insertedDuration += getDuration(insertNotes)
            if (deletedDuration > duration) {
              nIdx++
              // resore remainder of last deleted note
              document[mIdx].notes.splice(nIdx, 0, ...fillDuration(deletedDuration-duration, prevNote))
              nIdx--
            }
            setNextSelection(mIdx, nIdx)
            break
          }
          
          if (nIdx===document[mIdx].notes.length) {
            // if at end of measure, fill current measure and continue to next
            insertNotes = fillDuration(deletedMeasureDuration, note)
            document[mIdx].notes = document[mIdx].notes.concat(insertNotes)
            if (mIdx===document.length-1) {
              // if at last measure, break
              setNextSelection(mIdx, nIdx)
              break
            }
            insertedDuration += deletedMeasureDuration
            deletedMeasureDuration = 0
            mIdx++
            nIdx = 0
          }
        }
      })()
      break

    case 'measureInsert':
      const end = action.payload.mIdx===document.length
      let newNotes = []
      if (documentAttributes.timeSig.beats===3) {
        newNotes.push({type: 'quarter', rest: {_measure: 'yes'}},{type: 'quarter', rest: {_measure: 'yes'}},{type: 'quarter', rest: {_measure: 'yes'}})
      } else {
        newNotes.push({type: 'whole', rest: {_measure: 'yes'}})
      }
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

    case 'measureMove':
      (() => {
        let {mIdx, moveMeasureCount, direction} = action.payload
        const removed = document.splice(mIdx, 1)
        if (direction==='left') moveMeasureCount = -moveMeasureCount
        let newMIdx = mIdx + moveMeasureCount
        if (newMIdx < 0) newMIdx = 0
        if (newMIdx > document.length) newMIdx = document.length
        document.splice(newMIdx, 0, ...removed)
        setSelection({id: {measure: newMIdx, note: selection.id.note}, type: 'note', note: document[newMIdx].notes[selection.id.note]})
      })()
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