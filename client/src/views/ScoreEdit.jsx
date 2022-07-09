import React from 'react'
import { useEffect, useState } from 'react'
import positionElements from '../util/PositionElements'
import Score from '../components/score/Score'

const ScoreEdit = () => {
  const [zoom, setZoom] = useState(100)
  const [measures, setMeasures] = useState([])
  const [symbols, setSymbols] = useState([])
  const [staves, setStaves] = useState([])

  const getMusic = () => {
    let staticMeasures = [
      { number:1,
        loc: {x: 0, y: 0},
        clef:{sign: 'treble'},
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

    for (let i = 5; i < 55; i++) {
      // staticMeasures.forEach(measure => {
      //   staticMeasures.push({...measure, number: staticMeasures.length+1})
        
      // })
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
  
  return (
    <div className="d-flex flex-column" style={{height: '100vh'}}>
      <div className="border-bottom" style={{height: '50px'}}>top</div>
      <div className="d-flex" style={{flex: '1', overflow:'auto'}}>
        <div className="border" style={{width: '150px'}}>left</div>
        <div className="d-flex justify-content-center" style={{flex: '1', overflow:'auto', background:'#385f94'}}>
          <div style={{width: '100%', padding:'20px 25px'}}>
            <div style={{margin:'0 auto', width:`${14*zoom}px`, background: 'white'}}>
              <Score measures={measures} staves={staves} symbols={symbols} />
            </div>
          </div>
        </div>
        <div className="border" style={{width: '150px'}}>right</div>
      </div>

      {/* bottom panel */}
      <div className="border-top p-1" style={{}}>
        <div className="d-flex justify-content-end align-items-center">
          <label className="me-2">Zoom: {zoom}%</label>
          <div className="btn-group btn-sm" role="group" aria-label="Basic example">
            <button type="button" className="btn btn-sm btn-primary fw-bold" onClick={()=>setZoom(zoom+5)}>+</button>
            <button type="button" className="btn btn-sm btn-primary fw-bold" onClick={()=>setZoom(zoom-5)}>-</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ScoreEdit