import React from 'react'
import { useEffect, useState } from 'react'
import PanelTop from '../components/PanelTop'
import PanelRight from '../components/PanelRight'
import positionElements from '../util/PositionElements'
import Score from '../components/score/Score'
import Keyboard from '../components/Keyboard'

const ScoreEdit = () => {
  // application states
  const [zoom, setZoom] = useState(100)
  const [keyboardZoom, setKeyboardZoom] = useState(120)
  const [keyboardWidth, setKeyboardWidth] = useState(6/4)
  const [newNote, setNewNote] = useState({type: 'quarter'})
  const [selection, setSelection] = useState({})

  // document state
  const [document, setDocument] = useState([])
  const [undoStack, setUndoStack] = useState([])
  const [redoStack, setRedoStack] = useState([])

  // display states
  const [measures, setMeasures] = useState([])
  const [symbols, setSymbols] = useState([])
  const [staves, setStaves] = useState([])
  const [clef, setClef] = useState('')

  // update display states to reflect document
  const updateDisplayStates = (document) => {
    const elements = positionElements(structuredClone(document))
    setMeasures(elements.measures)
    setStaves(elements.staves)
    setSymbols(elements.symbols)
    setClef(elements.measures[0].clef.sign)
  }

  const documentReducer = (action) => {
    if (action.type!=='undo' && action.type!=='redo') {
      setUndoStack([...undoStack, structuredClone(document)])
    } else {
      if (action.type==='undo' && undoStack.length===0) return
      if (action.type==='redo' && redoStack.length===0) return
    }
    let nextDoc = []
    
    switch (action.type) {

      case 'setTimeSig':
        document[0].timeSig = structuredClone(action.payload)
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

  const getMusic = () => {
    let staticDocument = [
      { number:1,
        clef:{sign: 'bass'},
        timeSig:{beats: 4, beatsType: 4},
        notes: [
          {
            type: 'quarter',
            pitch: {
              step: 'D',
              // alter: 0,
              octave: 4,
            },
            dot: 1,
          },
          {
            type: 'quarter',
            pitch: {
              step: 'F',
              alter: 1,
              octave: 4,
            },
            dot: 1,
          },
          {
            type: 'quarter',
            pitch: {
              step: 'D',
              // alter: 0,
              octave: 4,
            }
          },
        ]
      },
      {number:2,
        notes: [
        {
          type: 'half',
          pitch: {
            step: 'C',
            // alter: 0,
            octave: 3,
          },
        },
        {
          type: 'half',
          pitch: {
            step: 'G',
            // alter: 0,
            octave: 4,
          },
        },
      ]},
      {number:3,
        notes: [
        {
          type: 'half',
          pitch: {
            step: 'D',
            // alter: 0,
            octave: 4,
          },
        },
        {
          type: 'half',
          pitch: {
            step: 'E',
            // alter: 0,
            octave: 4,
          },
        },
      ]},
      {number:4,
        notes: [
        {
          type: 'whole',
          pitch: {
            step: 'D',
            // alter: 0,
            octave: 4,
          },
        },
      ]},
    ]

    // for (let i = 5; i < 55; i++) {
    //   staticDocument.push({...JSON.parse(JSON.stringify(staticDocument[i%4])), number: i})
    // }

    // position all elements
    setDocument(staticDocument)
    updateDisplayStates(staticDocument)
  }
  
  useEffect(() => {
    getMusic()
  },[])
  
  // const placeNote = (note) => {
  //   let oldMeasures = measures
  //   if (measures!==[]) {
  //     oldMeasures[oldMeasures.length-1].notes.push(note)
  //     const elements = positionElements(measures)
  //     setMeasures(elements.measures)
  //     setStaves(elements.staves)
  //     setSymbols(elements.symbols)
  //   }
  // }
  const placeNote = (note) => {
    documentReducer({type: 'appendNote', payload: note})
  }
  
  return (
    <div className="d-flex flex-column" style={{height: '100vh', width: '100vw'}}>

      {/* top panel */}
      <PanelTop zoom={zoom} setZoom={setZoom} newNote={newNote} setNewNote={setNewNote} documentReducer={documentReducer} />

      <div className="d-flex" style={{flex: '1', overflow:'auto'}}>

        {/* left panel */}
        {/* <div className="border" style={{width: '150px'}}>
          left<br />
          {JSON.stringify(newNote)}
        </div> */}

        {/* center panel */}
        <div className="d-flex justify-content-center" style={{flex: '1', overflow:'auto', background:'#385f94'}}>
          <div style={{width: '100%', padding:'20px 25px'}}>
            <div style={{margin:'0 auto', width:`${14*zoom}px`, background: 'white'}}>
              <Score measures={measures} staves={staves} symbols={symbols} setSelection={setSelection} clef={clef} />
            </div>
          </div>
        </div>

        {/* right panel */}
        {selection.type!==undefined && <PanelRight selection={selection} setSelection={setSelection} documentReducer={documentReducer} />}
      </div>

      {/* bottom panel */}
        <div className="border-top" style={{width: '100%', overflowX: 'auto'}}>
          <div className="" style={{width: '100%'}}>
            <div style={{margin: '0 auto', width:`${keyboardWidth*keyboardZoom*10}px`}}><Keyboard placeNote={placeNote} newNote={newNote} setNewNote={setNewNote} keyboardZoom={keyboardZoom} setKeyboardZoom={setKeyboardZoom} setKeyboardWidth={setKeyboardWidth} />
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default ScoreEdit