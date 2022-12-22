import React from 'react'
import '../styles/keyboard.css'


const Keyboard = (props) => {
const { placeNoteCallback, appState } = props
const { newNote, keyboardZoom } = appState

  const keys = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B']
  const octaves = []
  for (let octave=2; octave<=6; octave++) {
    octaves.push(octave)
  }
  // setKeyboardWidth(octaves.length/4)

  const keyScale = keyboardZoom/100
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

  const placeNote = (step, octave) => {
    const tmpNote = structuredClone(newNote)
    tmpNote.pitch = { ...tmpNote.pitch, step: step[0], octave}
    if (step.length===2) tmpNote.pitch.alter = 1
    placeNoteCallback(tmpNote)
  }

  return (
    <div className="d-inline-flex">
      { octaves.map((octave, octIdx) => {
        return keys.map((key, keyIdx) => {
          const whiteKey = (key.length===1)
          return <div
              key={`${octIdx}_${keyIdx}`}
              onClick={() => placeNote(key, octave+(keyIdx>=9))}
              className={whiteKey ? 'whiteKey' : 'blackKey'}
              style={whiteKey ? whiteKeyStyle : blackKeyStyle}
            >
              {keyIdx===0 &&
                <div className="d-flex flex-column justify-content-end" style={{height: '100%'}}>
                  <div className='ms-1 noselect'>C{octave}</div>
                </div>
              }
          </div>
        })
      })}
    </div>
  )
}

export default Keyboard