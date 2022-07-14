import React from 'react'

const InspectClef = (props) => {
  const { document, documentReducer } = props

  return (
    <div>
      Clef:
      <select className="form-select mt-1"
        value={document[0].clef.sign}
        onChange={(e) => documentReducer({type: 'setClef', payload: {sign: e.target.value}})}
      >
        <option value="treble">Treble</option>
        <option value="bass">Bass</option>
      </select>
    </div>
  )
}

export default InspectClef