import React from 'react'
import { useEffect, useState } from 'react'
import positionNotes from '../util/PositionNotes'
import Score from '../components/score/Score'

const ScoreEdit = () => {
  const [zoom, setZoom] = useState(100)
  const [measures, setMeasures] = useState([])
  const [staves, setStaves] = useState([{x:0, y:0, width:2764}])

  const positionElements = () => {
    let measures = [
      { number:1,x:0,y:0,width:200,
        clef:{type: 'treble'},
        timeSig:{type: '3/4'},
        notes: [
          {
            type: 'half',
            pitch: {
              step: 'D',
              alter: 0,
              octave: 4,
            },
          },
          {
            type: 'quarter',
            pitch: {
              step: 'D',
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
            },
            dot: 1
          },
        ]
      },
      // {number:2,x:250,y:0,width:200, notes: []}
    ]

    // compute positions
    let x = 0 // last/ending horizontal position
    let line = 0
    let firstInLine = true

    let clef = ''
    measures = measures.map(measure => {
      if (measure.clef !== undefined) { let clef = measure.clef }

      return {
          ...measure,
        }
      })
    
    // setMeasures(measures)
    setMeasures(positionNotes(measures))
  }

  useEffect(() => {
    positionElements()
  },[])
  
  return (
    <div className="d-flex flex-column" style={{height: '100vh'}}>
      <div className="border-bottom" style={{height: '50px'}}>top</div>
      <div className="d-flex" style={{flex: '1', overflow:'auto'}}>
        <div className="border" style={{width: '150px'}}>left</div>
        <div className="d-flex justify-content-center" style={{flex: '1', overflow:'auto', background:'#385f94'}}>
          <div style={{width: '100%', padding:'20px 25px'}}>
            <div style={{margin:'0 auto', width:`${14*zoom}px`, background: 'white'}}>
              <Score measures={measures} staves={staves} />
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