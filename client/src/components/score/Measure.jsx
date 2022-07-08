import React from 'react'
import StaffLines from './StaffLines'
import Clef from './Clef'
import TimeSig from './TimeSig'

const Measure = (props) => {
  const { measure } = props
  
  return (
    <>
      {measure.clef !== undefined &&
        <Clef x={measure.x} y={measure.y} type={measure.clef.type} />
      }
      {measure.timeSig !== undefined &&
        <TimeSig x={measure.x} y={measure.y} type={measure.timeSig.type} />
      }
    </>
  )
}

export default Measure