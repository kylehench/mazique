import React from 'react'

const InspectMeasure = () => {
  return (
    <div>
      <h5>Measure</h5>
      <div>Insert New Measure(s)</div>
      <div className="d-flex align-items-center">
        <label>Count:</label>
        <input type="number" className='form-control form-control-sm ms-2 my-1' defaultValue='1' min='1' />
      </div>
      <div className="d-flex mb-3">
        <button className='btn btn-sm btn-secondary' style={{width: '110px'}}>Insert Before</button>
        <button className='btn btn-sm btn-secondary ms-2' style={{width: '110px'}}>Insert After</button>
      </div>
      <div>Move Measure</div>
      <div className="d-flex align-items-center">
        <label>Count:</label>
        <input type="number" className='form-control form-control-sm ms-2 my-1' defaultValue='1' min='1' />
      </div>
      <div className="d-flex mb-3">
        <button className='btn btn-sm btn-secondary' style={{width: '110px'}}>Move Left</button>
        <button className='btn btn-sm btn-secondary ms-2' style={{width: '110px'}}>Move Right</button>
      </div>
      <button className='btn btn-sm btn-danger'  >Delete Measure</button>
    </div>
  )
}

export default InspectMeasure