import React from 'react'
import { useEffect, useState } from 'react'
import PanelTop from '../components/PanelTop'
import PanelRight from '../components/PanelRight'
import PositionElements from '../util/PositionElements'
import Score from '../components/score/Score'
import Keyboard from '../components/Keyboard'
import DocumentReducer from '../util/DocumentReducer'
import ReferenceDocument from '../util/ReferenceDocument'

const ScoreEdit = () => {
  
  // document state
  const [document, setDocument] = useState(ReferenceDocument)
  const [undoStack, setUndoStack] = useState([])
  const [redoStack, setRedoStack] = useState([])
  // bundled document state
  const documentState = { document, setDocument, undoStack, setUndoStack, redoStack, setRedoStack }

  // display states
  const [measures, setMeasures] = useState([])
  const [symbols, setSymbols] = useState([])
  const [staves, setStaves] = useState([])
  const [clef, setClef] = useState('')
  
  // update display states to reflect document
  const updateDisplayStates = (document) => {
    const elements = PositionElements(structuredClone(document))
    setMeasures(elements.measures)
    setStaves(elements.staves)
    setSymbols(elements.symbols)
    setClef(elements.measures[0].clef.sign)
  }
  
  // application states
  const [zoom, setZoom] = useState(100)
  const [keyboardZoom, setKeyboardZoom] = useState(120)
  const [keyboardWidth, setKeyboardWidth] = useState(6/4)
  const [newNote, setNewNote] = useState({type: 'quarter'})
  const [notePosition, setNotePosition] = useState({position: 'end'})
  const [selection, setSelection] = useState({id: {measure: 0, note: 0}})
  const [pianoVisible, setPianoVisible] = useState(true)
  // bundled app state
  const appState = { updateDisplayStates, zoom, setZoom, keyboardZoom, setKeyboardZoom, keyboardWidth, setKeyboardWidth, newNote, setNewNote, selection, setSelection, notePosition, setNotePosition, pianoVisible, setPianoVisible }
  
  const documentReducer = (action) => DocumentReducer(action, documentState, appState)
  
  useEffect(() => {
    updateDisplayStates(ReferenceDocument)
  },[])
  
  const placeNoteCallback = (note) => {
    if (selection.type!=='note') return
    documentReducer({type: 'writeNote', payload: {note}})
  }
  
  return (
    <div className="d-flex flex-column" style={{height: '100vh', width: '100vw'}}>

        {/* top panel */}
        <PanelTop appState={appState} documentState={documentState} documentReducer={documentReducer} />

        <div className="d-flex" style={{flex: '1', overflow:'auto'}}>

          {/* left panel */}
          {/* <div className="border" style={{width: '150px'}}>
            left<br />
            {JSON.stringify(selection)}
          </div> */}

          {/* center panel */}
          <div className="d-flex justify-content-center" style={{flex: '1', overflow:'auto', background:'#385f94'}}>
            <div style={{width: '100%', padding:'20px 25px'}}>
              <div style={{margin:'0 auto', width:`${14*zoom}px`, background: 'white', boxShadow: '0px 0px 12px 10px rgba(0, 0, 0, 0.25)'}}>
                <Score measures={measures} staves={staves} symbols={symbols} setSelection={setSelection} clef={clef} />
              </div>
            </div>
          </div>

          {/* right panel */}
          {selection.type!==undefined && <PanelRight selection={selection} setSelection={setSelection} appState={appState} measures={measures} document={document} documentReducer={documentReducer} />}
        </div>

        {/* bottom panel */}
        {pianoVisible &&
          <div className="border-top" style={{width: '100%', overflowX: 'auto'}}>
            <div className="" style={{width: '100%'}}>
              <div style={{margin: '0 auto', width:`${keyboardWidth*keyboardZoom*10}px`}}><Keyboard appState={appState} placeNoteCallback={placeNoteCallback} />
              </div>
            </div>
          </div>
        }
    </div>
  )
}

export default ScoreEdit