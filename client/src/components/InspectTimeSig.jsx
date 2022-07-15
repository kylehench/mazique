import React from 'react'

const InspectTimeSig = (props) => {
  const { measures, document, documentReducer } = props
  let timeSig = measures[0].timeSig

  const setTimeSig = (element, change) => {
    let values = []
    if (element==='beats') {
      values = [2,3,4,6]
    } else if (element==='beatsType') {
      values = [4,8]
    }
    let idx = values.findIndex((value) => value===timeSig[element])
    if (change==='inc') {
      if (idx===values.length-1) return
      idx++
    } else if (change==='dec') {
      if (idx===0) return
      idx--
    }
    timeSig[element] = values[idx]
    documentReducer({type: 'setTimeSig', payload: timeSig})
  }

  return (<>
    <h5>Time Signature</h5>
    <table>
      <tbody>
        <tr>
          <td>Beats:</td>
          <td>
            <b>{timeSig.beats}</b>
            <div className="btn-group btn-sm ms-2">
              <button type="button" className={`btn btn-sm btn-primary fw-bold ${timeSig.beats===6 && 'disabled'}`} onClick={()=>setTimeSig('beats', 'inc')}>+</button>
              <button type="button" className={`btn btn-sm btn-primary fw-bold ${timeSig.beats===2 && 'disabled'}`} onClick={()=>setTimeSig('beats', 'dec')}>-</button>
            </div>
          </td>
        </tr>
        <tr>
          <td>Beat value:</td>
          <td>
            <b>{timeSig.beatsType}</b>
            <div className="btn-group btn-sm ms-2">
              <button type="button" className={`btn btn-sm btn-primary fw-bold ${timeSig.beatsType===8 && 'disabled'}`} onClick={()=>setTimeSig('beatsType', 'inc')}>+</button>
              <button type="button" className={`btn btn-sm btn-primary fw-bold ${timeSig.beatsType===4 && 'disabled'}`} onClick={()=>setTimeSig('beatsType', 'dec')}>-</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    </>)
}

export default InspectTimeSig