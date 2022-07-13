import React, { useState } from 'react'
import StaffLines from './StaffLines'
import Note from './Note'
import Clef from './Clef'
import TimeSig from './TimeSig'
import BarLine from './BarLine'

const Score = (props) => {
  const { measures, staves, symbols, setSelection, clef } = props
  
  return (
    // <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2976.38 4209.45">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3000 4209.45">
      <g fill="#000000">
        {/* <Measure x={0} y={0} width={1000} />
        <Measure x={0} y={300} width={1000} /> */}

        {/* render staves */}
        {staves.map((staff, idx) => {
          return <StaffLines key={idx} staff={staff} />
        })}

        {/* render notes */}
        { measures.map((measure, mIdx) => {
          // return <Measure key={measure.number} measure={measure} />
          return measure.notes.map((note, nIdx) => <Note key={`${mIdx}_${nIdx}`} note={note} id={{measure: mIdx, note: nIdx}} setSelection={setSelection} clef={clef} />)
        })}

        {/* render symbols */}
        { symbols.map(symbol => {
          if (symbol.type==='clef') return <Clef key={symbol.key} data={symbol.data} setSelection={setSelection} />
          if (symbol.type==='timeSig') return <TimeSig key={symbol.key} data={symbol.data} setSelection={setSelection} />
          if (symbol.type==='barLine') return <BarLine key={symbol.key} data={symbol.data} setSelection={setSelection} />
        }) }
        
      </g>
    </svg>
  )
}

export default Score