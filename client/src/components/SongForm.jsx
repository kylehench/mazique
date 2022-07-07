import React from 'react'

const SongForm = (props) => {
  const { song, setSong, submitText, onSubmitProp } = props

  const onSubmitHandler = e => {
    e.preventDefault()
    onSubmitProp()
  }
  
  return (
    <form onSubmit={onSubmitHandler} className='card p-4'>
      <div className='d-flex'>
        <div className='me-4 flex-fill'>
          <label>Song Title:</label>
          { props.validationErrors.title && <p className='text-danger'>{props.validationErrors.title.message}</p> }
          <input type="text" value={song.title} onChange={(e) => setSong({...song, title: e.target.value})} className="form-control mb-2"/>

          <label>Composer:</label>
          { props.validationErrors.composer && <p className='text-danger'>{props.validationErrors.composer.message}</p> }
          <input type="text" value={song.composer} onChange={(e) => setSong({...song, composer: e.target.value})} className="form-control mb-2"/>

          <label>Genre:</label>
          { props.validationErrors.genre && <p className='text-danger'>{props.validationErrors.genre.message}</p> }
          <input type="text" value={song.genre} onChange={(e) => setSong({...song, genre: e.target.value})} className="form-control mb-2"/>

          <label>Tempo (bpm):</label>
          { props.validationErrors.tempo && <p className='text-danger'>{props.validationErrors.tempo.message}</p> }
          <input type="number" value={song.tempo} onChange={(e) => setSong({...song, tempo: e.target.value})} className="form-control mb-2"/>

          <label>Comments:</label>
          { props.validationErrors.comments && <p className='text-danger'>{props.validationErrors.comments.message}</p> }
          <input type="text" value={song.comments} onChange={(e) => setSong({...song, comments: e.target.value})} className="form-control mb-2"/>

        </div>
      </div>
      <div>
        <input type="submit" value={submitText} className="btn btn-primary" />
      </div>
    </form>
  )
}

export default SongForm