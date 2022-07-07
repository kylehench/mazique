import React from 'react'
import StaffLines from './StaffLines'
import Clef from './Clef'
import TimeSig from './TimeSig'

const Measure = (props) => {
  const { x, y, width } = props
  
  return (
    <>
      <StaffLines x={x} y={y} width={width} />
      <Clef x={x} y={y} type="bass" />
      <TimeSig type="4/4" />
    </>
  )
}

export default Measure