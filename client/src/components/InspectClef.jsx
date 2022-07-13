import React from 'react'

const InspectClef = (props) => {
  const { selection, setSelection, documentReducer } = props

  return (
    <div>
      Clef:
      <select className="form-select mt-1" defaultValue={selection.clef.sign} onChange={(e) => documentReducer({type: 'setClef', payload: {sign: e.target.value}})}>
        <option value="treble">Treble</option>
        <option value="bass">Bass</option>
      </select>
    </div>
  )
}

export default InspectClef