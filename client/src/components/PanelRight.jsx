import React from 'react'
import InspectTimeSig from './score/InspectTimeSig'
import InspectClef from './score/InspectClef'

const PanelRight = (props) => {
  const { selection, setSelection, documentReducer } = props

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
        <button type="button" onClick={()=>setSelection({})} className="btn-close" aria-label="Close"></button>
      </div>
      {(() => {
        switch(selection.type) {
          case 'note': return <>
            Measure Number: <b>{selection.id.measure+1}</b><br />
            Note Number: <b>{selection.id.note+1}</b>
            <hr className='my-2'/>
            Step: <b>{selection.note.pitch.step}</b><br />
            Accidental: <b>{alterName(selection.note.pitch.alter)}</b><br />
            Octave: <b>{selection.note.pitch.octave}</b><br />
            Duration: <b>{selection.note.type}</b>
          </>
          case 'timeSig' : return <InspectTimeSig selection={selection} setSelection={setSelection} documentReducer={documentReducer} />
          case 'clef' : return <InspectClef selection={selection} setSelection={setSelection} documentReducer={documentReducer} />
          default: return null
        }
      })()}
    </div>
  )
}

export default PanelRight