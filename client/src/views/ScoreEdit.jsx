import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import PanelTop from '../components/PanelTop'
import PanelRight from '../components/PanelRight'
import PositionElements from '../util/PositionElements'
import Score from '../components/score/Score'
import Keyboard from '../components/Keyboard'
import DocumentReducer from '../util/DocumentReducer'
import ReferenceDocument from '../util/ReferenceDocument'
import { useParams } from 'react-router-dom'

const ScoreEdit = () => {
  const { id } = useParams()
  
  // document state
  const [document, setDocument] = useState([])
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
  const [keyboardZoom, setKeyboardZoom] = useState(145)
  const [keyboardWidth, setKeyboardWidth] = useState(5/4)
  const [newNote, setNewNote] = useState({type: 'quarter'})
  const [notePosition, setNotePosition] = useState({position: 'end'})
  const [selection, setSelection] = useState({})
  const [pianoVisible, setPianoVisible] = useState(true)
  const [inspectorVisible, setInspectorVisible] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  const updateScoreAPI = () => {
    axios.put(`http://localhost:8000/api/scores/${id}`, {document: document})
      .then(res => {
        setSuccessMessage('btn-success')
        setTimeout(() => {
          setSuccessMessage('');
        }, 2000)
      })
      .catch(err => console.log(err))
  }
  
  // bundled app state
  const appState = { updateDisplayStates, zoom, setZoom, keyboardZoom, setKeyboardZoom, keyboardWidth, setKeyboardWidth, newNote, setNewNote, selection, setSelection, notePosition, setNotePosition, pianoVisible, setPianoVisible, updateScoreAPI, successMessage, setSuccessMessage }
  
  const documentReducer = (action) => DocumentReducer(action, documentState, appState)
  
  useEffect(() => {
    axios.get(`http://localhost:8000/api/scores/${id}`)
      .then(res => {
        if (!res.data.document[0].timeSig) res.data.document[0].timeSig = ReferenceDocument[0].timeSig
        if (!res.data.document[0].clef) res.data.document[0].clef = ReferenceDocument[0].clef
        setDocument(res.data.document)
        updateDisplayStates(res.data.document)
      })
      .catch(err => console.log(err))
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
          {/* <div className="border" style={{width: '250px'}}>
            left<br />
            {JSON.stringify(document)}
          </div> */}

          {/* center panel */}
          <div className="d-flex justify-content-center" style={{flex: '1', overflow:'auto', background:'#315fa3'}}>
            <div style={{width: '100%', padding:'20px 25px'}}>
              <div style={{margin:'0 auto', width:`${14*zoom}px`, background: 'white', boxShadow: '0px 0px 12px 10px rgba(0, 0, 0, 0.25)'}}>
                <Score measures={measures} staves={staves} symbols={symbols} selection={selection} setSelection={setSelection} setInspectorVisible={setInspectorVisible} clef={clef} />
              </div>
            </div>
          </div>

          {/* right panel */}
          {inspectorVisible && <PanelRight selection={selection} setSelection={setSelection} appState={appState} measures={measures} setInspectorVisible={setInspectorVisible} document={document} documentReducer={documentReducer} />}
        </div>

        {/* bottom panel */}
        {pianoVisible &&
          <div className="border-top text-center" style={{width: '100%', overflowX: 'auto'}}>
              <div className="text-center" style={{margin: '0 auto'}}>
                <Keyboard appState={appState} placeNoteCallback={placeNoteCallback} />
              </div>
          </div>
        }
    </div>
  )
}

export default ScoreEdit