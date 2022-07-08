import React, { useState } from 'react'
import Measure from './Measure'
import StaffLines from './StaffLines'
import Note from './Note'

const Score = (props) => {
  const { measures, staves, symbols } = props
  const ordered = useState()
  
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
          return measure.notes.map((note, nIdx) => <Note key={`${mIdx}_${nIdx}`} note={note}/>)
        })}

        {/* render symbols */}
        { symbols.map(symbol => symbol) }
        
      </g>
    </svg>
  )
}

export default Score