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

    case 'writeNote0':
      const walk0 = (mIdx, nIdx, allowAppend = false) => {
        // increments mIdx and/or nIdx to next note. If allowAppend is true, new measure may be added after last
        if (nIdx<document[mIdx].notes.length-1) {
          nIdx++
        } else if (mIdx<document.length-1) {
          mIdx++
          nIdx = 0
        } else if (allowAppend===true) {
          DocumentReducer({type: 'measureInsert', payload: { mIdx, insertMeasureCount: 1}})
        }
      }
      
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
        const getDuration = (note) => {
          let duration = durationLookup[note.type]
          if (note.dot===1) duration += duration/2
          return duration
        }

        const noteDuration = durationLookup[note.type]
        let prevNoteDuration = durationLookup[prevNote.type]
        if (prevNote.dot===1) prevNoteDuration += prevNoteDuration/2
        let overflow = noteDuration-prevNoteDuration
        if (prevNote.dot!==undefined) delete prevNote.dot
        
        // overFlow = (-) (note shorter than prevNote), 0 (same length), or (+) (note longer than prevNote)
        while (overflow>0) {
          // delete notes to make space
          prevNote = document[mIdx].notes[nIdx]
          overflow -= getDuration(prevNote)
          delete document[mIdx].notes[nIdx]
          if (nIdx===document[mIdx].notes.length) {

          }
        }
        if (overflow===0) {
          document[mIdx].notes[nIdx] = structuredClone(note)
          walk0(mIdx, nIdx)
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

    case 'writeNote':
      const durationLookup = {}
      const typeLookup = {}
      const noteTypes = ['whole', 'half', 'quarter', 'eighth']
      let nextSelection = {}
      noteTypes.forEach((type, idx) => {
        durationLookup[type] = 1/(2**idx)
        typeLookup[1/(2**idx)] = durationLookup[type]
      })
      
      const getDuration = (notes) => {
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
        // increments mIdx and/or nIdx to next note
        if (nIdx<document[mIdx].notes.length-1) {
          nIdx++
        } else if (mIdx<document.length-1) {
          mIdx++
          nIdx = 0
        }
        setSelection({id: {measure: mIdx, note: nIdx}, type: 'note', note: document[mIdx].notes[nIdx]})
      }

      const deleteNotes = (mIdx, nIdx, count) => {
        for (let i = 0; i<count; i++) {
          document[mIdx].notes.splice(nIdx, 1)
          if (nIdx===document[mIdx].notes.length) {
            mIdx++
            nIdx = 0
          } else if (mIdx===document.length) return
        }
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
          // if (length===0) setSelection({id: {measure: mIdx, note: nIdx}, type: 'note', note: note})
          if (length===fillDuration) return newNotes
        }
      }
      
      (() => {
        const note = action.payload.note
        let mIdx = selection.id.measure  // measure idx
        let nIdx = selection.id.note     // note idx
        let insertNotes = []
        
        // let overwriteCount = 1
        let duration = getDuration(note)

        let insertedDuration = 0  // total duration of new note(s)
        let deletedDuration = 0  // duration of deleted notes.
        let deletedMeasureDuration = 0  // duration of deleted notes. resets at end of measure

        while (insertedDuration<duration) {
          // overwriteCount++
          // nextNoteId = walk(end.mIdx, end.nIdx, true)
          // length += getDuration(document[end.mIdx].notes[end.nIdx])
          
          // delete note to make space for new note. Save copy in case new note is shorter
          let prevNote = document[mIdx].notes.splice(nIdx, 1)[0]  // note being overwritten
          deletedDuration += getDuration(prevNote)
          deletedMeasureDuration += getDuration(prevNote)

          if (deletedDuration>=duration) {
            // if deleted duration pushes into requested length, add remaining duration, resore remainder of last deleted note if necessary, and break
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