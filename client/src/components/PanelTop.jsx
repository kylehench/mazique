import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import * as Icon from 'react-feather'

const PanelTop = (props) => {
  const { appState, documentReducer } = props
  const { undoStack, redoStack } = props.documentState
  const [accidental, setAccidental] = useState()
  const { zoom, setZoom, newNote, setNewNote } = props.appState

  const selectDuration = (duration) => {
    setNewNote({...newNote, type: duration})
  }
  const selectAccidental = (accidental) => {
    setAccidental(accidental)
    if (accidental==='none') {
      delete newNote.pitch.alter
      setNewNote({...newNote})
    } else {
      setNewNote({...newNote, pitch: {...newNote.pitch, alter: accidental}})
    }
  }
  const toggleDot = () => {
    if (newNote.dot) {
      delete newNote.dot
    } else {
      newNote.dot = 1
    }
  }
  
  return (
    <div className="border-bottom d-flex justify-content-between align-items-center" style={{}}>
      <div>
        <button className='btn btn-sm btn-primary m-1 ms-2'>
          <Link to={`/`} style={{ color: 'inherit', textDecoration: 'inherit'}}>Home</Link>
        </button>
        <button className={`btn btn-sm border border-secondary m-1 ${undoStack.length===0 && 'disabled'}`} onClick={() => documentReducer({type: 'undo'})}>
          <Icon.RotateCcw className='icon' size={16} />
        </button>
        <button className={`btn btn-sm border border-secondary m-1 ${redoStack.length===0 && 'disabled'}`} onClick={() => documentReducer({type: 'redo'})}>
          <Icon.RotateCw className='icon' size={16} />
        </button>

      </div>
      <div className="d-flex align-items-center">

        {/* note duration controls */}
        <div>
          <label className="noselect">Duration:</label>
          <button 
            className={`btn btn-sm btn-outline-primary ms-2 ${newNote.type==='quarter' && 'active'}`}
            onClick={() => selectDuration('quarter')}
            >Quarter</button>
          <button 
            className={`btn btn-sm btn-outline-primary mx-1 ${newNote.type==='half' && 'active'}`}
            onClick={() => selectDuration('half')}
          >Half</button>
          <button 
            className={`btn btn-sm btn-outline-primary ${newNote.type==='whole' && 'active'}`}
            onClick={() => selectDuration('whole')}
          >Whole</button>
        </div>
        <div className="vr mx-3"></div>
        <div className="form-check border-left">
          <input className="form-check-input text text-sm" type="checkbox" onClick={() => toggleDot()} />
          <label className="form-check-label noselect">
            Dotted Note
          </label>
        </div>
        <div className="vr mx-3"></div>

        {/* accidental controls */}
        <div>
          <label className="noselect">Accidental:</label>
          <button 
            className={`btn btn-sm btn-outline-primary ms-2 ${accidental===-1 && 'active'}`}
            onClick={() => selectAccidental(-1)}
            >Flat</button>
          <button 
            className={`btn btn-sm btn-outline-primary mx-1 ${accidental===0 && 'active'}`}
            onClick={() => selectAccidental(0)}
            >Natural</button>
          <button 
            className={`btn btn-sm btn-outline-primary ${accidental===1 && 'active'}`}
            onClick={() => selectAccidental(1)}
          >Sharp</button>
          <button 
            className={`btn btn-sm btn-outline-primary ms-1 ${accidental==='none' && 'active'}`}
            onClick={() => selectAccidental('none')}
            >None</button>
        </div>
      </div>
      <div>
      
        <label className="me-1 noselect">Zoom: {zoom}%</label>
        <div className="btn-group btn-sm" role="group" aria-label="Basic example">
          <button type="button" className="btn btn-sm btn-primary fw-bold" onClick={()=>setZoom(zoom+10)}>
            <div className="d-flex">
              <Icon.ZoomIn size={18} />
           </div>
          </button>
          <button type="button" className="btn btn-sm btn-primary fw-bold" onClick={()=> {if (zoom>10) setZoom(zoom-10)}}>
            <div className="d-flex">
             <Icon.ZoomOut size={18} />
           </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default PanelTop