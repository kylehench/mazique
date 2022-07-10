import React from 'react'
import '../styles/keyboard.css'


const Keyboard = (props) => {
const { placeNote, newNote } = props

  const keys = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B']
  const keyScale = 1
  const keyWidth = '35px'
  const whiteKeyStyle = {
    height:`${keyScale*105}px`,
    width:`${keyScale*35}px`,
  }
  const blackKeyStyle = {
    height:`${keyScale*65}px`,
    width:`${keyScale*22}px`,
    marginLeft: `${keyScale*-11}px`,
    marginRight: `${keyScale*-11}px`,
    zIndex: 2,
  }

  const placeNoteCallBack = (step, octave) => {
    const tmpNote = structuredClone(newNote)
    tmpNote.pitch = { ...tmpNote.pitch, step, octave}
    console.log(tmpNote)
    placeNote(tmpNote)
  }

  return (
    <div className="d-flex">
      
      
      {/* <div className="whiteKey" style={whiteKeyStyle}></div>
      <div className="blackKey" style={blackKeyStyle}></div>
      <div className="whiteKey" style={whiteKeyStyle}></div>
      <div className="whiteKey" style={whiteKeyStyle}></div>
      <div className="blackKey" style={blackKeyStyle}></div> */}
      { keys.map((key, idx) => {
        if (key.length===1) return <div key={idx} onClick={() => placeNoteCallBack('D', 4)} className="whiteKey" style={whiteKeyStyle}>
          {idx===0 &&
            <div className="d-flex flex-column justify-content-end" style={{height: '100%'}}>
              <div className='ms-1'>C4</div>
            </div>
          }
        </div>
        return <div key={idx} onClick={() => placeNoteCallBack('D', 4)} className="blackKey" style={blackKeyStyle}></div>
      })}
    </div>
  )
}

export default Keyboard