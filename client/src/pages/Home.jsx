import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { useUser } from '../context/UserContext'
import { createCodeRoom, getUserCodeRooms } from '../api/codeRoom'


const Home = ({ theme }) => {
    const { user, setUser } = useUser()
    const navigate = useNavigate()

    const [roomId, setRoomId] = useState("")
    const [codingRooms, setCodingRooms] = useState([])

    useEffect(() => {
        console.log(user)
        if (!user) {
            navigate('/login')
        }
        const fetchUserRooms = async () => {
            const codingRooms = await getUserCodeRooms(user.id)
            setCodingRooms(codingRooms)
        }
        fetchUserRooms()

    }, [])

    const createRoom = async () => {
        const newRoomId = uuidv4()
        setRoomId(newRoomId)
        await createCodeRoom(newRoomId)
        navigate(`/editor/${newRoomId}`)
    }

    const joinRoom = () => {
        navigate(`/editor/${roomId}`)
    }

    return (
        <div className="flex flex-col items-center justify-center h-[80vh] space-y-4 text-primary">
            <h3 className='text-3xl mb-4'>Real-Time Code Editor</h3>
            <button onClick={createRoom} className='py-2 px-4 bg-green-600 text-gray-100 rounded-md'>Create Coding workspace</button>
            <p>or</p>
            <form>
                <input onChange={(e) => setRoomId(e.target.value)} value={roomId} className="p-2 rounded-md m-2 bg-bgSecondary" type="text" placeholder="Enter Workspace ID" />
                <button onClick={joinRoom} className='bg-blue-600 px-4 py-2 m-2 text-gray-100 rounded-md'>Join a CodeSpace</button>
            </form>
            <hr />
            <h1 className="text-3xl font-bold text-center mb-6">Coding Workspaces</h1>
            <div className="w-1/2 flex flex-col justify-top space-y-4 h-[50%] overflow-y-auto">
                {codingRooms.map((workspace) => (
                    <Link to={`/editor/${workspace.id}`} key={workspace.id} className="w-[60%] mx-auto p-4 rounded-lg shadow-md bg-bgSecondary">
                        <h3 className="text-xl font-semibold">{workspace.name}</h3>
                        <p className="text-sm">{workspace.language}</p>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Home