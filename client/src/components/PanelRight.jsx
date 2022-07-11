import React from 'react'

const PanelRight = (props) => {
  const { selection, setSelection } = props

  const alterName = (alter) => {
    if (alter===1) return 'sharp'
    if (alter===0) return 'natural'
    if (alter===-1) return 'flat'
    return 'none'
  }
  
  return (
    <div className="border p-3" style={{width: '250px'}}>
      <div className="d-flex justify-content-between">
        <h3 className='mb-3'>Inspector</h3>
        <button type="button" onClick={()=>setSelection({})} class="btn-close" aria-label="Close"></button>
      </div>
      {selection.id && <>
        Measure Number: <b>{selection.id.measure+1}</b><br />
        Note Number: <b>{selection.id.note+1}</b>
        <hr className='my-2'/>
        Step: <b>{selection.note.pitch.step}</b><br />
        Accidental: <b>{alterName(selection.note.pitch.alter)}</b><br />
        Octave: <b>{selection.note.pitch.octave}</b><br />
        Type: <b>{selection.note.type}</b>
      </>}
    </div>
  )
}

export default PanelRight