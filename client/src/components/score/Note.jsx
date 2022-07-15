import React from 'react'
import { useState } from 'react'

const Note = (props) => {
  const { note, id, setSelection, clef } = props
  const { x, y } = note.loc
  const { type, pitch, rest } = note
  const restPresent = rest!==undefined
  let step
  if (pitch) {
    step = (pitch.step.toLowerCase().charCodeAt(0)-100)+(7*(pitch.octave-3))
  } else {
    step = 0
  }
  if (clef==='treble' && !restPresent) step -= 12
  const [color, setColor] = useState('black')

  let key = 0
  const keyGenerator = () => {
    key++
    return key
  }

  const renderLedgerLines = () => {
    const arr = []
    let start, change
    if (step > 5) {
      start = 6
      change = 2
    } else if (step < -5) {
      start = -6
      change = -2
    } else {
      return []
    }
    for (let i = 6*step/Math.abs(step); Math.abs(i) <= Math.abs(step); i+=change) {
      arr.push(
        <polyline key={keyGenerator()} className="LedgerLine" fill="none" stroke={color} strokeWidth="3.97" strokeLinejoin="bevel" points={`${513.182+x},${435.827-i*12.4016+y} ${561.78+x},${435.827-i*12.4016+y}`} />
      )
    }
    return arr
  }

  const renderAccidental = () => {
    if (pitch.alter===1) return <path
      className="Accidental"
      key={keyGenerator()}
      style={{fill: color}}
      transform={`matrix(0.992126,0,0,0.992126,${491+x},${435.827-step*12.4016+y})`} d="M23.2969,-10.5938 C23.9063,-10.7031 24.4063,-11.4063 24.4063,-12 L24.4063,-17.9063 C24.4063,-18.7031 23.7969,-19.2969 23,-19.2969 L22.7969,-19.2969 L19.5,-18.5938 L19.5,-33.5 L16.7031,-33.5 L16.7031,-18 L7.79688,-16.2031 L7.79688,-30.2969 L5,-30.2969 L5,-15.5938 L1.09375,-14.7969 C0.5,-14.7031 0,-14 0,-13.4063 L0,-13.2031 L0,-7.40625 L0,-7.59375 C0,-6.79688 0.59375,-6.20313 1.40625,-6.20313 L1.70313,-6.20313 L5,-6.90625 L5,9.59375 L1.09375,10.4063 C0.5,10.5 0,11.2031 0,11.7969 L0,17.5938 C0,18.4063 0.59375,19 1.40625,19 L1.70313,19 L5,18.2969 L5,33.2031 L7.79688,33.2031 L7.79688,17.7031 L16.7031,15.9063 L16.7031,30 L19.5,30 L19.5,15.2969 L23.2969,14.5938 C23.9063,14.5 24.4063,13.7969 24.4063,13.2031 L24.4063,7.29688 C24.4063,6.5 23.7969,5.90625 23,5.90625 L22.7969,5.90625 L19.5,6.59375 L19.5,-9.90625 L23.2969,-10.5938 M7.79688,9.09375 L7.79688,-7.5 L16.7031,-9.29688 L16.7031,7.20313 L7.79688,9.09375"
    />
    if (pitch.alter===0) return <path
      className="Accidental"
      key={keyGenerator()}
      style={{fill: color}}
      transform={`matrix(0.992126,0,0,0.992126,${491+x},${435.827-step*12.4016+y})`} d="M16.5938,-18.2969 C16.4063,-18.5 16.0938,-18.5938 15.7969,-18.5938 C15.7031,-18.5938 15.5,-18.5 15.4063,-18.5 L2.79688,-15 L2.79688,-32.5 L0,-32.5 L0,17 C0,17.7969 0.59375,18.2969 1.40625,18.2969 L1.79688,18.2969 L14.4063,14.7969 L14.4063,32.2969 L17.0938,32.2969 L17.0938,-17.2031 C17.0938,-17.5938 16.9063,-18.0938 16.5938,-18.2969 M14.4063,6.5 L2.79688,9.70313 L2.79688,-6.70313 L14.4063,-10 L14.4063,6.5"
    />
    if (pitch.alter===-1) return <path
      className="Accidental"
      key={keyGenerator()}
      style={{fill: color}}
      transform={`matrix(0.992126,0,0,0.992126,${491+x},${435.827-step*12.4016+y})`} d="M20.0938,-7.90625 C19.5,-11.7969 17.0938,-15.5 12,-15.5 C7,-15.5 4.09375,-12.4063 3.59375,-11.7969 L4,-43.9063 C4,-44.7031 3.40625,-45.2969 2.59375,-45.2969 L1.40625,-45.2969 C0.59375,-45.2969 0,-44.7031 0,-43.9063 L0.5,16.2031 C0.5,17 1.09375,17.5938 1.90625,17.5938 C2.09375,17.5938 2.5,17.5 2.70313,17.4063 C3.09375,17.2031 9.59375,14 15,7.90625 C18.7969,3.59375 20.2969,-1.29688 20.2969,-5.40625 C20.2969,-6.29688 20.2031,-7.09375 20.0938,-7.90625 M13.2031,-4 C13.2031,-2.5 12.7969,2.09375 10.2969,5.90625 C8.59375,8.5 5.20313,11.2031 3.29688,12.7031 L3.59375,-6.79688 C3.79688,-7.70313 5.29688,-10.5938 9.29688,-10.5938 C12.9063,-10.5938 13.2031,-7.20313 13.2031,-5.09375 L13.2031,-4"
    />
  }

  const renderDot = () => {
    let dotYValue = 435.8264+y
    let dotXValue = 566.106+x
    if (!restPresent) {
      if (Math.abs(step)<5 && step%2===0) dotYValue = -12.4014
      dotYValue -= step*12.4016
    } else {
      dotYValue -= 12.4014
      if (type==='eighth' || type==='quarter') dotXValue -=7
    }
    return <path
      className="NoteDot"
      key={keyGenerator()}
      style={{fill: color}}
      transform={`matrix(0.992126,0,0,0.992126,${dotXValue},${dotYValue})`} d="M0,0 C0,2.76563 2.23438,5 5,5 C7.76563,5 10,2.76563 10,0 C10,-2.76563 7.76563,-5 5,-5 C2.23438,-5 0,-2.76563 0,0"/>
  }

  const renderNote = () => {
    const glyphs = []
    
    if (!restPresent) {
      switch (type) {
        case 'quarter':
          glyphs.push(<path
            key={keyGenerator()}
            className="Note"
            style={{fill: color}}
            transform={`matrix(0.992126,0,0,0.992126,${521.863+x},${435.8264-step*12.4016+y})`} d="M31.5,-8.09375 C29.7031,-11.4063 25.9063,-13.2031 21.2969,-13.2031 C17.9063,-13.2031 14.2031,-12.2031 10.5938,-10.2969 C4,-6.79688 0,-0.90625 0,4.20313 C0,5.59375 0.296875,7 1,8.29688 C2.79688,11.5938 6.59375,13.2969 11.2031,13.2969 C14.5938,13.2969 18.2969,12.4063 21.9063,10.5 C28.5,7 32.5,1.09375 32.5,-4 C32.5,-5.40625 32.2031,-6.79688 31.5,-8.09375" />)
          break
          
        case 'half':
          glyphs.push(<path
            key={keyGenerator()}
            className="Note"
            style={{fill: color}}
            transform={`matrix(0.992126,0,0,0.992126,${521.863+x},${435.8264-step*12.4016+y})`} d="M31.5,-8.14063 C29.7031,-11.4375 25.9063,-13.2344 21.2969,-13.2344 C17.9063,-13.2344 14.2031,-12.2344 10.5938,-10.3438 C4,-6.84375 0,-0.9375 0,4.15625 C0,5.5625 0.296875,6.96875 1,8.26563 C2.79688,11.5781 6.59375,13.2813 11.2031,13.2813 C14.5938,13.2813 18.2969,12.375 21.9063,10.4844 C28.5,6.96875 32.5,1.0625 32.5,-4.04688 C32.5,-5.4375 32.2031,-6.84375 31.5,-8.14063 M27.2031,-1.34375 C25.5,0.359375 22.0938,2.45313 18.5,4.46875 C14.9063,6.46875 11.2969,7.96875 8.90625,8.46875 C8.40625,8.57813 7.90625,8.67188 7.40625,8.67188 C5.79688,8.67188 4.59375,8.07813 3.90625,6.76563 C3.59375,6.26563 3.40625,5.67188 3.40625,5.0625 C3.40625,3.96875 4.09375,2.65625 5.20313,1.5625 C6.90625,-0.140625 10.2031,-2.23438 13.7969,-4.23438 C17.4063,-6.23438 21,-7.73438 23.4063,-8.23438 C23.9063,-8.34375 24.4063,-8.4375 24.9063,-8.4375 C26.5,-8.4375 27.7969,-7.84375 28.5,-6.54688 C28.7969,-6.04688 28.9063,-5.4375 28.9063,-4.84375 C28.9063,-3.73438 28.2969,-2.54688 27.2031,-1.34375" />)
          break
            
        case 'whole':
          glyphs.push(<path
            key={keyGenerator()}
            className="Note"
            style={{fill: color}}
            transform={`matrix(0.992126,0,0,0.992126,${520+x},${435.8264-step*12.4016+y})`} d="M18.7031,-13.5938 C4.90625,-13.5938 0,-6.59375 0,-0.09375 C0,6.40625 4.90625,13.4063 18.7031,13.4063 C32.5,13.4063 37.2969,6.40625 37.2969,-0.09375 C37.2969,-6.59375 32.5,-13.5938 18.7031,-13.5938 M10.4063,-4.5 C10.2969,-4.90625 10.2969,-5.29688 10.2969,-5.70313 C10.2969,-6.5 10.5,-7.29688 10.9063,-8 C11.5938,-9 12.7969,-9.70313 14.2969,-10 C15.5938,-10.2969 16.2969,-10.5 18.9063,-10.5 L19,-10.5 C23,-10.5 24.2969,-6.79688 25.4063,-3 L25.7031,-2 C26.5,0.59375 26.9063,2.79688 26.9063,4.5 C26.9063,5.70313 26.7031,6.79688 26.2969,7.59375 C25.7031,8.70313 24.7031,9.40625 23,9.79688 C22.0938,10 20.5938,10.0938 20.5938,10.0938 C20.0938,10.0938 19.7031,10.2031 19.2969,10.2031 C16.0938,10.2031 14.0938,9 12.7031,4.70313 C11.5,1 11.2969,-0.09375 10.4063,-4.5" />)
          break
                
        default:
          break
      }
      // render stem if present 
      if (step < 0 && type!=='whole') {
        // up stem
        glyphs.push(<polyline key={keyGenerator()} className="Stem" fill="none" stroke={color} strokeWidth="2.73" strokeLinejoin="bevel" points={`${552.735+x},${432.652-step*12.4016+y} ${552.735+x},${349.015-step*12.4016+y}`} />)
      } else if (step >= 0 && type!=='whole') {
        // down stem
        glyphs.push(<polyline key={keyGenerator()} className="Stem" fill="none" stroke={color} strokeWidth="2.73" strokeLinejoin="bevel" points={`${523.223+x},${439.16-step*12.4016+y} ${523.223+x},${513.337-step*12.4016+y}`} />)
      }

      // render accidental if present
      if (pitch.alter!==undefined) glyphs.push(renderAccidental())

      // render ledger line(s) if present
      renderLedgerLines().forEach((line) => glyphs.push(line))

      
    } else if (restPresent) {
      switch (type) {
        case 'eighth':
          glyphs.push(<path className="Rest" transform={`matrix(0.992126,0,0,0.992126,${525+x},${435.8264-step*12.4016+y})`} d="M26.7344,-20.2656 C25.9844,-20.5469 25.3125,-20.2031 24.9844,-19.5938 C24.6563,-18.9844 21.4688,-13.0625 17.0469,-9.79688 C15.6563,-8.78125 14.0625,-8.14063 12.5,-7.8125 C13.625,-9.0625 14.2969,-10.7344 14.2969,-12.5469 C14.2969,-16.5 11.0938,-19.7031 7.15625,-19.7031 C3.20313,-19.7031 0,-16.5 0,-12.5469 C0,-9.54688 1.875,-6.95313 4.51563,-5.90625 C6.04688,-5.1875 7.95313,-4.73438 10,-4.73438 C12.8438,-4.73438 15.9531,-5.5625 18.6719,-7.5625 C19.9375,-8.48438 21.125,-9.6875 22.2031,-10.9375 L10.8125,24.6875 L13.4531,25.5469 L27.5313,-18.5469 C27.7656,-19.2813 27.4688,-19.9688 26.7344,-20.2656"/>)
        break

        case 'quarter':
          glyphs.push(<path key={keyGenerator()} className="Rest" transform={`matrix(0.992126,0,0,0.992126,${525+x},${435.8264-step*12.4016+y})`} d="M23.2031,16.9063 L23,16.5938 C22.9063,16.5 22.7031,16.2969 22.4063,15.9063 L10.9063,1.70313 C10.5938,1.40625 10.7031,0.59375 10.9063,0.203125 L21.0938,-15.2031 C21.2031,-15.4063 21.2969,-15.7031 21.2969,-15.9063 L21.2969,-16.7969 C21.2969,-17.0938 21.2031,-17.4063 21,-17.5938 L4.79688,-39.5 C4.79688,-39.5 4,-40.7031 3,-39.7969 C2,-39 2.79688,-37.7031 2.79688,-37.7031 L10.4063,-27.2969 C10.7969,-26.7031 10.7969,-25.5 10.4063,-24.9063 L0.296875,-9.5 C0.203125,-9.29688 0.09375,-8.90625 0.09375,-8.70313 L0.09375,-7.79688 C0.09375,-7.5 0.203125,-7.20313 0.40625,-7 L11.5938,6.90625 C11.2031,6.79688 10.2969,6.59375 9.09375,6.59375 C7.40625,6.59375 5.20313,7 3.40625,8.59375 C1.20313,10.5938 0,13.4063 0,15.9063 C0,17.2969 0.296875,18.7031 1.09375,19.7969 C3.20313,23 10.7031,32.5 10.7031,32.5 C10.7031,32.5 11.5938,33.6094 12.5,32.9063 C13.4063,32.2031 13.2031,31.2969 12.9063,30.7969 C12.5938,30.2969 9.40625,24.5 9.40625,24.5 C9.40625,24.5 8.70313,23.0938 8.70313,21.2969 C8.70313,20 9.09375,18.4063 10.4063,17.0938 C11.5938,15.9063 13,15.5 14.2969,15.5 C15.5938,15.5 16.7031,15.9063 17.5,16.4063 L21.4063,18.9063 C21.4063,18.9063 22.5938,19.5 23.2031,18.5938 C23.7031,17.7969 23.5,17.4063 23.2031,16.9063"/>)
        break
          
        case 'half':
          glyphs.push(<path key={keyGenerator()} className="Rest" transform={`matrix(0.992126,0,0,0.992126,${525+x},${435.8264-(step+1)*12.4016+y})`} d="M31.1094,-0.5 L1.40625,-0.5 C0.59375,-0.5 0,0.09375 0,0.90625 L0,11.7031 C0,12.5 0.59375,13.0938 1.40625,13.0938 L31.1094,13.0938 C31.9063,13.0938 32.5,12.5 32.5,11.7031 L32.5,0.90625 C32.5,0.09375 31.9063,-0.5 31.1094,-0.5"/>)
          break
          
        case 'whole':
          glyphs.push(<path key={keyGenerator()} className="Rest" transform={`matrix(0.992126,0,0,0.992126,${525+x},${435.8264-(step+2)*12.4016+y})`} d="M31.1094,-0.5 L1.40625,-0.5 C0.59375,-0.5 0,0.09375 0,0.90625 L0,11.7031 C0,12.5 0.59375,13.0938 1.40625,13.0938 L31.1094,13.0938 C31.9063,13.0938 32.5,12.5 32.5,11.7031 L32.5,0.90625 C32.5,0.09375 31.9063,-0.5 31.1094,-0.5"/>)
          break
          
      
        default:
          break;
      }
    }

    // render augmentation dot if present
    if (note.dot!==undefined) glyphs.push(renderDot())
    
    return glyphs
  }

  return (
    <g
      onFocus={()=> {
        setSelection({id, type: 'note', note})
      }}
      style={{pointerEvents: 'bounding-box'}}
      tabIndex={0}
    >
      {/* render note */}
      {renderNote()}
    </g>
  )
}

export default Note