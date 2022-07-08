import React from 'react'
import Clef from './Clef'
import TimeSig from './TimeSig'
import Note from './Note'

const Measure = (props) => {
  const { measure } = props

  const render = () => {
    const arr = []

    return arr
  }
  
  return (
    <>
      {measure.clef !== undefined &&
        <Clef x={measure.x} y={measure.y} type={measure.clef.type} />
      }
      {measure.timeSig !== undefined &&
        <TimeSig x={measure.x} y={measure.y} type={measure.timeSig.type} />
      }
      
      <Note x={20} y={0} step={10} type={'half'} 
        note={
          {
            type: 'quarter',
            pitch: {
              step: 'D',
              // alter: 0,
              octave: 4,
            },
          }
        }
      />
    </>
  )
}

export default Measure