import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { useUser } from '../context/UserContext'


const Home = () => {
    const { user, setUser } = useUser()
    const navigate = useNavigate()

    const roomId = uuidv4()

    useEffect(() => {
        console.log(user)
        if (!user.id){
            navigate('/register')
        }
    }, [user])

    return (
        <div className='flex flex-col items-center justify-center h-[60vh]'>
            <h3 className='text-3xl text-white mb-4'>Real Time Editor</h3>
            <Link className='py-2 px-4 bg-green-600 text-white' to={`/editor/${roomId}`}>Create Coding workspace</Link>
        </div>
    )
}

export default Home