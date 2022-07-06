import React from 'react'

const SongForm = (props) => {
  const { song, setSong, onSubmitProp } = props

  const onSubmitHandler = e => {
    e.preventDefault()
    onSubmitProp()
  }
  
  return (
    <form onSubmit={onSubmitHandler} className='card p-4'>
      <div className='d-flex'>
        <div className='me-4 flex-fill'>
          <label>Song Name:</label>
          { props.validationErrors.name && <p className='text-danger'>{props.validationErrors.name.message}</p> }
          <input type="text" value={song.name} onChange={(e) => setSong({...song, name: e.target.value})} className="form-control mb-2"/>
          <label>Song Type:</label>
          { props.validationErrors.type && <p className='text-danger'>{props.validationErrors.type.message}</p> }
          <input type="text" value={song.type} onChange={(e) => setSong({...song, type: e.target.value})} className="form-control mb-2"/>
          <label>Song Description:</label>
          { props.validationErrors.description && <p className='text-danger'>{props.validationErrors.description.message}</p> }
          <input type="text" value={song.description} onChange={(e) => setSong({...song, description: e.target.value})} className="form-control mb-2"/>
        </div>
        {/* <div className='flex-fill'>
          <div>Skills (optional):</div>
          <label>Skill 1:</label>
          <input type="text" value={song.skills[0]} onChange={(e) => setSong({...song, skills: [e.target.value, ...song.skills.slice(1,3)]})} className="form-control mb-2"/>
          <label>Skill 2:</label>
          <input type="text" value={song.skills[1]} onChange={(e) => setSong({...song, skills: [song.skills[0], e.target.value, song.skills[2]]})} className="form-control mb-2"/>
          <label>Skill 3:</label>
          <input type="text" value={song.skills[2]} onChange={(e) => setSong({...song, skills: [...song.skills.slice(0,2), e.target.value]})} className="form-control mb-2"/>
        </div> */}
      </div>
      <div>
        <input type="submit" value="Submit" className="btn btn-primary" />
      </div>
    </form>
  )
}

export default SongForm