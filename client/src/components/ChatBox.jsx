import React, { useEffect, useState } from 'react'
import { useUser } from '../context/UserContext'
import useSocket from '../hooks/useSocket'
import { createMessage, getMessages } from '../api/message'

const ChatBox = ({ roomId }) => {
    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState([])

    const { user } = useUser()
    const { sendMessage, getMessage } = useSocket()

    // fetch messages for the code room
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const messages = await getMessages(roomId)
                setMessages(messages)
            } catch (error) {
                console.log(error)
            }
        }
        if (roomId) {
            fetchMessages()
        }
    }, [roomId])

    // listen messages from the server
    useEffect(() => {
        getMessage((message, user) => {
            setMessages([...messages, { 
                user_id: user.id, 
                content: message, 
                username: user.username,
                email: user.email
            }])

        })
    }, [roomId, messages])

    // scroll to the bottom of the messages container
    useEffect(() => {
        // Select the messages container using a class or other selector
        const messagesContainer = document.querySelector('.messages');
        if (messagesContainer) {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    }, [messages]);

    const sendMessageToServer = async () => {
        if (message && roomId && user) {
            sendMessage(message, roomId, user)
            try {
                await createMessage(roomId, user.id, message)
                setMessage("")
            } catch (error) {
                console.log(error)
            }
        }
    }

    // const messages = 
    return (
        <div className='h-[60vh] bg-neutral-800/30' >
            <div className='messages h-[90%] overflow-y-auto'>
                <div className='flex flex-col space-y-2 p-4'>
                    {messages.map((message, index) => (
                        <div key={index} className='flex flex-row items-center space-x-2'>
                            <div className='h-8 w-8 bg-gray-600 rounded-full flex items-center justify-center text-white'>
                                {message.username[0].toUpperCase()}
                            </div>
                            <div className='flex flex-col'>
                                <p className='text-white'>{message.username}</p>
                                <p className='text-sm text-gray-400'>{message.content}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className='flex items-center justify-center h-10 space-x-2'>
                <input onChange={(e) => setMessage(e.target.value)} value={message} className='w-4/5 p-2 rounded-md bg-neutral-700 text-white' type='text' placeholder='Type a message...' />
                <button onClick={sendMessageToServer} className='bg-blue-600 text-white px-4 py-2 rounded-md'>Send</button>
            </div>
        </div >
    )
}

export default ChatBox