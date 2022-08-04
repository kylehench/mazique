import React, { useState } from 'react'

const InspectMeasure = ({ selection, documentReducer }) => {
  const [insertMeasureCount, setInsertMeasureCount] = useState('1')
  const [moveMeasureCount, setMoveMeasureCount] = useState('1')
  
  const measureInsert = (direction) => {
    let mIdx = selection.id.measure
    if (direction==='right') mIdx++
    documentReducer({type: 'measureInsert', payload: {mIdx, insertMeasureCount: parseInt(insertMeasureCount)}})
  }

  const measureMove = (direction) => {
    let mIdx = selection.id.measure
    documentReducer({type: 'measureMove', payload: {mIdx, moveMeasureCount: parseInt(moveMeasureCount), direction}})
  }
  
  return (
    <div>
      <h5>Measure</h5>
      <div>Insert New Measure(s)</div>
      <div className="d-flex align-items-center">
        <label>Count:</label>
        <input type="number" className='form-control form-control-sm ms-2 my-2' value={insertMeasureCount} onChange={(e) => setInsertMeasureCount(e.target.value)} min='1' />
      </div>
      <div className="d-flex mb-3">
        <button className='btn btn-sm btn-secondary' onClick={() => measureInsert('left')} style={{width: '110px'}}>Insert Before</button>
        <button className='btn btn-sm btn-secondary ms-2' onClick={() => measureInsert('right')} style={{width: '110px'}}>Insert After</button>
      </div>
      <div>Move Measure</div>
      <div className="d-flex align-items-center">
        <label>Count:</label>
        <input type="number" className='form-control form-control-sm ms-2 my-2' value={moveMeasureCount} onChange={(e) => setMoveMeasureCount(e.target.value)} min='1' />
      </div>
      <div className="d-flex mb-3">
        <button className='btn btn-sm btn-secondary' onClick={() => measureMove('left')} style={{width: '110px'}}>Move Left</button>
        <button className='btn btn-sm btn-secondary ms-2' onClick={() => measureMove('right')} style={{width: '110px'}}>Move Right</button>
      </div>
      <button className='btn btn-sm btn-danger' onClick={() => documentReducer({type: 'measureDelete', payload: selection})} >Delete Measure</button>
    </div>
  )
}

export default InspectMeasure