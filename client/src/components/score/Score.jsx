import React, { useState } from 'react'
import Measure from './Measure'
import StaffLines from './StaffLines'

const Score = (props) => {
  const { measures, staves } = props
  const ordered = useState()
  
  return (
    // <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2976.38 4209.45">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3300 4209.45">
      <g fill="#000000">
        {/* <Measure x={0} y={0} width={1000} />
        <Measure x={0} y={300} width={1000} /> */}
        {staves.map((staff, idx) => {
          return <StaffLines key={idx} x={staff.x} y={staff.y} width={staff.width} />
        })}
        {measures.map(measure => {
          return <Measure key={measure.number} measure={measure} />
        })}
        
      </g>
    </svg>
  )
}

export default Score