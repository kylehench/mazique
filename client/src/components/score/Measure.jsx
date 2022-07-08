import React from 'react'
import Clef from './Clef'
import TimeSig from './TimeSig'
import Note from './Note'
import BarLine from './BarLine'

const Measure = (props) => {
  const { measure } = props
  
  return (
    <>
      {/* {measure.clef !== undefined &&
        <Clef x={measure.x} y={measure.y} type={measure.clef.type} />
      }
      {measure.timeSig !== undefined &&
        <TimeSig x={measure.x} y={measure.y} type={measure.timeSig.type} />
      } */}
      {/* {measure.notes.map((note, idx) => <Note key={idx} x={note.loc.x} y={note.loc.y} note={note}/>)} */}

      {/* <BarLine x={0} y={0} /> */}

    </>
  )
}

export default Measure