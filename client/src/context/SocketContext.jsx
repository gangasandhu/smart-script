import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

const SocketContext = React.createContext()

export const SocketProvider = ({children}) => {
    const [socket, setSocket] = useState(null)

    useEffect(() => {
        const socketInstance = io("http://localhost:3000")

        setSocket(socketInstance)

        return () => {
            socketInstance.disconnect()
        }
    }, []);
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketContext