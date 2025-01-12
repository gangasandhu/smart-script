import React, { useState } from 'react'
import { useUser } from '../context/UserContext'
import {v4 as uuidv4} from 'uuid'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const { user, setUser } = useUser()
    const [username, setUsername] = useState("")

    const navigate = useNavigate()

    const submitUser = () => {
        const newUser = {
            id: uuidv4(),
            username: username
        }
        setUser(newUser)
        localStorage.setItem("user", JSON.stringify(newUser))
        navigate("/")
    }
    return (
        <div className='flex flex-col items-center justify-center h-[60vh]'>
            <div className='text-2xl text-white'>Register</div>
            <input className='p-2 rounded-md m-2' onChange={(e) => setUsername(e.target.value)} value={username} type="text" placeholder="Username" />
            <button className='bg-green-600 text-white px-4 py-2 m-2' onClick={submitUser}>Register</button>
        </div>
    )
}

export default Register