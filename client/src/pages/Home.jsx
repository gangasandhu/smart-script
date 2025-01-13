import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { useUser } from '../context/UserContext'


const Home = ({theme}) => {
    const { user, setUser } = useUser()
    const navigate = useNavigate()

    const [roomId, setRoomId] = useState("")

    useEffect(() => {
        console.log(user)
        if (!user.id){
            navigate('/register')
        }
    }, [user])

    const createRoom = () => {
        const newRoomId = uuidv4()
        setRoomId(newRoomId)
        navigate(`/editor/${newRoomId}`)
    }

    const joinRoom = () => {
        navigate(`/editor/${roomId}`)
    }

    return (
        <div className={`flex flex-col items-center justify-center h-[60vh] space-y-4 ${theme === 'light' ? 'text-neutral-800' : 'text-gray-100'}`}>
            <h3 className='text-3xl mb-4'>Real-Time Code Editor</h3>
            <button onClick={createRoom} className='py-2 px-4 bg-green-600 text-gray-100'>Create Coding workspace</button>
            <p>or</p>
            <form>
            <input onChange={(e) => setRoomId(e.target.value)} value={roomId} className={`p-2 rounded-md m-2 ${theme === 'light' ? "bg-gray-200" : "bg-neutral-900"}`} type="text" placeholder="Enter Workspace ID" />
            <button onClick={joinRoom}  className='bg-blue-600 px-4 py-2 m-2 text-gray-100'>Join a CodeSpace</button>
            </form>
        </div>
    )
}

export default Home