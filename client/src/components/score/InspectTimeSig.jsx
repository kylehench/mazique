import React from 'react'

const InspectTimeSig = (props) => {
  const { selection, setSelection, documentReducer } = props

  const setTimeSig = (element, change) => {
    const tmpTimeSig = selection.timeSig
    let values = []
    if (element==='beats') {
      values = [2,3,4,6]
    } else if (element==='beatsType') {
      values = [4,8]
    }
    let idx = values.findIndex((value) => value===tmpTimeSig[element])
    if (change==='inc') {
      if (idx===values.length-1) return
      idx++
    } else if (change==='dec') {
      if (idx===0) return
      idx--
    }
    tmpTimeSig[element] = values[idx]
    documentReducer({type: 'setTimeSig', payload: tmpTimeSig})
  }

  return (
    <table>
      <tbody>
        <tr>
          <td>Beats:</td>
          <td>
            <b>{selection.timeSig.beats}</b>
            <div className="btn-group btn-sm ms-2" role="group" aria-label="Basic example">
              <button type="button" className={`btn btn-sm btn-primary fw-bold ${selection.timeSig.beats===6 && 'disabled'}`} onClick={()=>setTimeSig('beats', 'inc')}>+</button>
              <button type="button" className={`btn btn-sm btn-primary fw-bold ${selection.timeSig.beats===2 && 'disabled'}`} onClick={()=>setTimeSig('beats', 'dec')}>-</button>
            </div>
          </td>
        </tr>
        <tr>
          <td>Beat value:</td>
          <td>
            <b>{selection.timeSig.beatsType}</b>
            <div className="btn-group btn-sm ms-2" role="group" aria-label="Basic example">
              <button type="button" className={`btn btn-sm btn-primary fw-bold ${selection.timeSig.beatsType===8 && 'disabled'}`} onClick={()=>setTimeSig('beatsType', 'inc')}>+</button>
              <button type="button" className={`btn btn-sm btn-primary fw-bold ${selection.timeSig.beatsType===4 && 'disabled'}`} onClick={()=>setTimeSig('beatsType', 'dec')}>-</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default InspectTimeSig