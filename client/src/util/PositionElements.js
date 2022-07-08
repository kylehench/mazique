
import Clef from "../components/score/Clef"
import StaffLines from "../components/score/StaffLines"
import TimeSig from "../components/score/TimeSig"

const positionElements = (measures, staves=[], symbols=[], start = 0) => {
  let x = 0
  let xTrigger = 1000 // x-value that triggers wrap
  let y = 0
  let newLine = true
  // for (let mIdx = 0; mIdx < measures.length; mIdx++) {
  //   measures[mIdx].notes.forEach((note, nIdx) => {
  //     measures[mIdx].notes[nIdx].loc = {x: x, y: 0}
  //     x += 100
  //   })
  // }
  
  measures.forEach((measure, mIdx, mArray) => {
    // add clef
    if (newLine===true) {
      symbols.push(<Clef key={symbols.length.toString()} x={x} y={y} sign={measures[0].clef.sign} />)
    }
    newLine = false

    // add time signature
    if (mIdx===1) {
      symbols.push(<TimeSig key={symbols.length.toString()} x={x} y={y} beats={measures[0].timeSig.beats} beatsType={measures[0].timeSig.beatsType} />)
    }

    // position notes
    measure.notes.forEach((note, nIdx, nArray) => {
      note.loc = {x: x, y: 0}
      x += 0
    })

    // add stave
    if (mIdx === mArray.length - 1){ 
      staves.push({x: 0, y: 0, width:1000}) 
    }
  })
  return { measures, staves, symbols }
}

export default positionElements