import React from 'react'

const InspectNote = (props) => {
  const { selection } = props

  const alterName = (alter) => {
    if (alter===1) return 'sharp'
    if (alter===0) return 'natural'
    if (alter===-1) return 'flat'
    return 'none'
  }
  
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>Measure Number:</td>
            <td><b>{selection.id.measure+1}</b></td> 
          </tr>
          <tr>
            <td>Note Number:</td>
            <td><b>{selection.id.note+1}</b></td> 
          </tr>
        </tbody>
      </table>
      <hr className='my-2'/>
      <table>
        <tbody>
          <tr>
            <td>Step:</td>
            <td><b>{selection.note.pitch.step}</b></td> 
          </tr>
          <tr>
            <td>Accidental:</td>
            <td><b>{alterName(selection.note.pitch.alter)}</b></td> 
          </tr>
          <tr>
            <td>Octave:</td>
            <td><b>{selection.note.pitch.octave}</b></td> 
          </tr>
          <tr>
            <td>Duration:</td>
            <td><b>{selection.note.type}</b></td> 
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default InspectNote