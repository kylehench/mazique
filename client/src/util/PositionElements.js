const positionElements = (measures, staves=[], symbols=[], start = 0) => {
  let x = 0
  let measureStartX = 0 // initial x value of measure
  let xTrigger = 2500 // x-value that triggers wrap
  let xSpacer = 0 // used to justify content of full lines
  let spaceCount = 0 // count number of spaces on a line
  let y = 0
  let width = 0 // width of measure

  let newLine = true
  
  measures.forEach((measure, mIdx, mArray) => {
    let prevSymbolLength = symbols.length
    const positionMeasureElements = () => {
      // add clef
      if (newLine===true) {
        symbols.push({type: 'clef', key: symbols.length.toString(), data: {x: x, y: y, sign: measures[0].clef.sign}})
        x += 77
      }
      newLine = false
      
      // add time signature
      if (mIdx===0) {
        symbols.push({type: 'timeSig', key: symbols.length.toString(), data: {x: x, y: y, beats: measures[0].timeSig.beats, beatsType: measures[0].timeSig.beatsType}})
        x += 63
      }

      measureStartX = x
      // position notes
      measure.notes.forEach((note, nIdx, nArray) => {
        if (note.pitch.alter) x+=30
        note.loc = {x: x-140, y: y}
        if (note.dot) x += 10
        if (note.type==='whole') x += 100
        else if (note.type==='half') x += 85
        else x += 70
      })
      
      // add barline
      x += 50
      if (mIdx !== mArray.length - 1){
        symbols.push({type: 'barLine', key: symbols.length.toString(), data: {x: x, y: y}})
      } else {
        x += 20
        symbols.push({type: 'barLine', key: symbols.length.toString(), data: {x: x, y: y, type: 'end'}})
      }
    }

    positionMeasureElements()
  
    if (x > xTrigger) {
      staves.push({x: 0, y: y, xEnd: measureStartX}) 
      x = 0
      y += 500
      newLine = true
      symbols.length = prevSymbolLength
      positionMeasureElements()
    }
    
    if (mIdx === mArray.length - 1){ 
      staves.push({x: 0, y: y, xEnd: x}) 
    }
  })
  return { measures, staves, symbols }
}

export default positionElements