import React from 'react'
import InspectTimeSig from './InspectTimeSig'
import InspectClef from './InspectClef'
import InspectNote from './InspectNote'

const PanelRight = (props) => {
  const { selection, setSelection, documentReducer } = props
  
  return (
    <div className="border p-3" style={{width: '250px'}}>
      <div className="d-flex justify-content-between">
        <h3 className='mb-3'>Inspector</h3>
        <button type="button" onClick={()=>setSelection({})} className="btn-close" aria-label="Close"></button>
      </div>
      {(() => {
        switch(selection.type) {
          case 'note' : return <InspectNote selection={selection} setSelection={setSelection} documentReducer={documentReducer} />
          case 'timeSig' : return <InspectTimeSig selection={selection} setSelection={setSelection} documentReducer={documentReducer} />
          case 'clef' : return <InspectClef selection={selection} setSelection={setSelection} documentReducer={documentReducer} />
          default: return null
        }
      })()}
    </div>
  )
}

export default PanelRight