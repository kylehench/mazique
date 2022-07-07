import React from 'react'
import { useState } from 'react'
import Score from '../components/score/Score'

const ScoreEdit = () => {
  const [zoom, setZoom] = useState(100)
  
  return (
    <div className="d-flex flex-column" style={{height: '100vh'}}>
      <div className="border-bottom" style={{height: '50px'}}>top</div>
      <div className="d-flex" style={{flex: '1', overflow:'auto'}}>
        <div className="border" style={{width: '150px'}}>left</div>
        <div className="d-flex justify-content-center" style={{flex: '1', overflow:'auto', background:'#385f94'}}>
          <div style={{width: '100%'}}>
            <div style={{margin:'0 auto', width:`${1200*zoom/100}px`, background: 'white'}}>
              <Score />
            </div>
          </div>
        </div>
        <div className="border" style={{width: '150px'}}>right</div>
      </div>

      {/* bottom panel */}
      <div className="border-top p-1" style={{}}>
        <div className="d-flex justify-content-end align-items-center">
          <label className="me-2">Zoom: {zoom}%</label>
          <div class="btn-group btn-sm" role="group" aria-label="Basic example">
            <button type="button" class="btn btn-sm btn-primary fw-bold" onClick={()=>setZoom(zoom+5)}>+</button>
            <button type="button" class="btn btn-sm btn-primary fw-bold" onClick={()=>setZoom(zoom-5)}>-</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ScoreEdit