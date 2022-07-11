import React from 'react'

const SongForm = (props) => {
  const { song, setSong, submitText, onSubmitProp } = props
  const errors = props.validationErrors

  const onSubmitHandler = e => {
    e.preventDefault()
    onSubmitProp()
  }
  
  return (
    <form onSubmit={onSubmitHandler} className='card p-4'>
      <div className='d-flex'>
        <div className='me-4 flex-fill'>
          <label>Song Title:</label>
          { errors.title && <p className='text-danger'>{errors.title.message}</p> }
          <input type="text" value={song.title} onChange={(e) => setSong({...song, title: e.target.value})} className="form-control mb-2"/>

          <label>Composer:</label>
          { errors.composer && <p className='text-danger'>{errors.composer.message}</p> }
          <input type="text" value={song.composer} onChange={(e) => setSong({...song, composer: e.target.value})} className="form-control mb-2"/>

          <label>Genre:</label>
          { errors.genre && <p className='text-danger'>{errors.genre.message}</p> }
          <input type="text" value={song.genre} onChange={(e) => setSong({...song, genre: e.target.value})} className="form-control mb-2"/>

          <label>Tempo (bpm):</label>
          { errors.tempo && <p className='text-danger'>{errors.tempo.message}</p> }
          <input type="number" value={song.tempo} onChange={(e) => setSong({...song, tempo: e.target.value})} className="form-control mb-2"/>

          <label>Comments:</label>
          { errors.comments && <p className='text-danger'>{errors.comments.message}</p> }
          <input type="text" value={song.comments} onChange={(e) => setSong({...song, comments: e.target.value})} className="form-control mb-2"/>

        </div>
      </div>
      <div className="mt-2">
        <input type="submit" value={submitText} className="btn btn-primary" />
      </div>
    </form>
  )
}

export default SongForm