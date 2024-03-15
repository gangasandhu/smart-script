import { useState } from 'react'
import '../styles/App.css'
import '../styles/chat.css'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css'
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react'
import processMessageToChatGPT from '../services/ai';

const Chat = () => {
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm ChatGPT. Feel free to ask me anything!",
      direction: 'incoming',
      sentTime: "just now",
      sender: "ChatGPT"
    }
  ]);

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: 'outgoing',
      sender: "user"
    }

    const newMessages = [...messages, newMessage]; // all old messages plus new one

    // update message state
    setMessages(newMessages);

    // set typing indicator (chatgpt is typing)
    setTyping(true);

    // process message to chatgpt
    const response = await processMessageToChatGPT(newMessages);
    setMessages(
      [...newMessages, {
        message: response,
        sender: "ChatGPT",
        direction: 'incoming'
      }]
    );
    setTyping(false);
  }


  return (
    <div className="chat-box">
        <MainContainer>
          <ChatContainer>
            <MessageList
              scrollBehavior='smooth'
              typingIndicator={typing ? <TypingIndicator content="ChatGPT is typing" /> : null}
            >
              {messages.map((message, i) => {
                return <Message key={i} model={message} />
              })}
            </MessageList>
            <MessageInput placeholder='Type message here' onSend={handleSend} />
          </ChatContainer>
        </MainContainer>
    </div>
  )
}

export default Chat
