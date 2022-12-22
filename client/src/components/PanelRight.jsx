import React from 'react'
import InspectTimeSig from './InspectTimeSig'
import InspectClef from './InspectClef'
import InspectNote from './InspectNote'

const PanelRight = (props) => {
  const { selection, setSelection, setInspectorVisible, measures, document, documentReducer } = props
  
  return (
    <div className="border d-flex flex-column" style={{width: '255px', height: '100%'}}>
      <div className='p-3' style={{overflow:'auto'}}>
        <div className="d-flex justify-content-between">
          <h3 className='mb-3'>Inspector</h3>
          <button type="button" onClick={()=>{
            setInspectorVisible(false)
            if (selection.type!=='note') setSelection({})
          }} className="btn-close" aria-label="Close"></button>
        </div>
        {(() => {
          switch(selection.type) {
            case 'note' : return <InspectNote selection={selection} documentReducer={documentReducer} />
            case 'timeSig' : return <InspectTimeSig measures={measures} document={document} documentReducer={documentReducer} />
            case 'clef' : return <InspectClef document={document} documentReducer={documentReducer} />
            default: return null
          }
        })()}

      </div>
    </div>
  )
}

export default PanelRight