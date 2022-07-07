import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Like from '../components/Like'
import DeleteButton from '../components/DeleteButton'

const Pet = (props) => {
  const { socket } = props
  const { id } = useParams()
  const [pet, setPet] = useState({})
  const petRef = useRef({})
  petRef.current = pet
  const [loaded, setLoaded] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`http://localhost:8000/api/pets/${id}`)
    .then(res => {
      setPet(res.data)
      setLoaded(true)
    })
    .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    socket.on('adopt', data => {
      console.log('adoption event')
      if (data._id===petRef.current._id) navigate('/')
    })
  }, [])

  const deleteSuccess = () => {
    socket.emit('adopt', {_id: pet._id})
    navigate('/')
  }

  return (
    <div className='container mt-3'>
      { loaded && <>
        <div className='d-flex justify-content-between'>
          <div>
            <h1>Pet Shelter</h1>
            <h4 className='my-3'>Details about: {pet.name}</h4>
          </div>
          <div className='d-flex flex-column align-items-end'>
            <Link to={`/`}>back to home</Link>
            <div className="mt-3"><DeleteButton pet={pet} successCallback={deleteSuccess} /></div>
          </div>
        </div>
        <div className='card p-3'>
          <div>
            <table>
              <tbody>
                <tr>
                  <td className='pb-3 pe-3' valign='top'><b>Type:</b></td>
                  <td className='pb-3'>{pet.type}</td>
                </tr>
                <tr>
                  <td className='pb-3 pe-3' valign='top'><b>Description:</b></td>
                  <td className='pb-3'>{pet.description}</td>
                </tr>
                <tr className=''>
                  <td className='pe-3' valign='top'><b>Skills:</b></td>
                  <td>
                    {pet.skills.map(skill => <>
                      {skill}<br />
                    </>)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className='d-flex justify-content-center pt-3'>
            <Like pet={pet} setPet={setPet} id={pet._id} />
          </div>
        </div>
      </> }
    </div>
  )
}

export default Pet