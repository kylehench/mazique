import React from 'react'
import { useEffect, useState } from 'react'
import PanelTop from '../components/PanelTop'
import positionElements from '../util/PositionElements'
import Score from '../components/score/Score'
import Keyboard from '../components/Keyboard'

const ScoreEdit = () => {
  const [zoom, setZoom] = useState(100)
  const [measures, setMeasures] = useState([])
  const [symbols, setSymbols] = useState([])
  const [staves, setStaves] = useState([])

  const [newNote, setNewNote] = useState({type: 'quarter'})

  const getMusic = () => {
    let staticMeasures = [
      { number:1,
        loc: {x: 0, y: 0},
        clef:{sign: 'bass'},
        timeSig:{beats: 4, beatsType: 4},
        notes: [
          {
            type: 'quarter',
            pitch: {
              step: 'D',
              // alter: 0,
              octave: 4,
            },
            dot: 1,
          },
          {
            type: 'quarter',
            pitch: {
              step: 'F',
              alter: 1,
              octave: 4,
            },
            dot: 1,
          },
          {
            type: 'quarter',
            pitch: {
              step: 'D',
              // alter: 0,
              octave: 4,
            }
          },
        ]
      },
      {number:2,x:250,y:0,
        notes: [
        {
          type: 'half',
          pitch: {
            step: 'C',
            // alter: 0,
            octave: 3,
          },
        },
        {
          type: 'half',
          pitch: {
            step: 'G',
            // alter: 0,
            octave: 5,
          },
        },
      ]},
      {number:3,x:250,y:0,
        notes: [
        {
          type: 'half',
          pitch: {
            step: 'D',
            // alter: 0,
            octave: 4,
          },
        },
        {
          type: 'half',
          pitch: {
            step: 'E',
            // alter: 0,
            octave: 4,
          },
        },
      ]},
      {number:4,x:250,y:0,
        notes: [
        {
          type: 'whole',
          pitch: {
            step: 'D',
            // alter: 0,
            octave: 4,
          },
        },
      ]},
    ]

    for (let i = 5; i < 15; i++) {
      staticMeasures.push({...JSON.parse(JSON.stringify(staticMeasures[i%4])), number: i})
    }

    // position all elements
    const elements = positionElements(staticMeasures)
    setMeasures(elements.measures)
    setStaves(elements.staves)
    setSymbols(elements.symbols)
  }
  
  useEffect(() => {
    getMusic()
  },[])
  
  const placeNote = (note) => {
    let oldMeasures = measures
    if (measures!==[]) {
      oldMeasures[oldMeasures.length-1].notes.push(note)
      const elements = positionElements(measures)
      setMeasures(elements.measures)
      setStaves(elements.staves)
      setSymbols(elements.symbols)
    }
  }
  
  return (
    <div className="d-flex flex-column" style={{height: '100vh'}}>

      {/* top panel */}
      <PanelTop zoom={zoom} setZoom={setZoom} newNote={newNote} setNewNote={setNewNote} />

      <div className="d-flex" style={{flex: '1', overflow:'auto'}}>

        {/* left panel */}
        <div className="border" style={{width: '150px'}}>
          left<br />
          {JSON.stringify(newNote)}
        </div>
        <div className="d-flex justify-content-center" style={{flex: '1', overflow:'auto', background:'#385f94'}}>
          <div style={{width: '100%', padding:'20px 25px'}}>
            <div style={{margin:'0 auto', width:`${14*zoom}px`, background: 'white'}}>
              <Score measures={measures} staves={staves} symbols={symbols} />
            </div>
          </div>
        </div>

        {/* right panel */}
        <div className="border" style={{width: '50px'}}>right</div>
      </div>

      {/* bottom panel */}
      <div className="border-top p-1" style={{}}>
        <div className="d-flex justify-content-center align-items-center">
          <div><Keyboard placeNote={placeNote} newNote={newNote} setNewNote={setNewNote} /></div>
          
        </div>
      </div>
    </div>
  )
}

export default ScoreEdit