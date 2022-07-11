import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const PanelTop = (props) => {
  const { zoom, setZoom, newNote, setNewNote } = props
  const [duration, setDuration] = useState()
  const [accidental, setAccidental] = useState()

  const selectDuration = (duration) => {
    setNewNote({...newNote, type: duration})
    setDuration(duration)
  }
  const selectAccidental = (accidental) => {
    setAccidental(accidental)
    if (accidental==='none') {
      const tmpNote = newNote
      delete tmpNote.pitch.alter
      setNewNote({...tmpNote})
    } else {
      setNewNote({...newNote, pitch: {...newNote.pitch, alter: accidental}})
    }
  }
  const clearAccidental = () => {
  }
  
  return (
    <div className="border-bottom d-flex justify-content-between align-items-center" style={{}}>
      <button className='btn btn-sm btn-primary m-1 ms-2'>
        <Link to={`/`} style={{ color: 'inherit', textDecoration: 'inherit'}}>Home</Link>
      </button>
      <div>
        <label>Duration:</label>
        <button 
          className={`btn btn-sm btn-outline-primary ms-2 ${duration==='quarter' && 'active'}`}
          onClick={() => selectDuration('quarter')}
        >Quarter</button>
        <button 
          className={`btn btn-sm btn-outline-primary mx-1 ${duration==='half' && 'active'}`}
          onClick={() => selectDuration('half')}
        >Half</button>
        <button 
          className={`btn btn-sm btn-outline-primary ${duration==='whole' && 'active'}`}
          onClick={() => selectDuration('whole')}
        >Whole</button>

        <label className="ms-4">Accidental:</label>
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
      <div>
        <label className="me-1">Zoom: {zoom}%</label>
        <div className="btn-group btn-sm" role="group" aria-label="Basic example">
          <button type="button" className="btn btn-sm btn-primary fw-bold" onClick={()=>setZoom(zoom+10)}>+</button>
          <button type="button" className="btn btn-sm btn-primary fw-bold" onClick={()=>setZoom(zoom-10)}>-</button>
        </div>
      </div>
    </div>
  )
}

export default PanelTop