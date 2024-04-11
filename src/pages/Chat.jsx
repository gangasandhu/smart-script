import { useState } from 'react'
import '../styles/App.css'
import '../styles/chat.css'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css'
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react'
import { processMessageToChatGPT } from '../services/ai';

const Chat = ({mainTheme}) => {
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm your personal AI Assistant. Feel free to ask me anything!",
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
      <MainContainer
        className={mainTheme !== 'light' && 'main-container shadow'}
      >
        <ChatContainer>
          <MessageList
            className={mainTheme !== 'light' && 'message-container'}
            scrollBehavior='smooth'
            typingIndicator={typing ? <TypingIndicator className={mainTheme !== 'light' && 'typing'} content="ChatGPT is typing" /> : null}
          >
            {messages.map((message, i) => {
              if (mainTheme == 'light')
                return <Message key={i} data-testid='message' model={message} /> 
              else 
                return <Message className={`cs-message--${message.direction} cs-message__content`} data-testid={'message'} key={i} model={message} />
             
            })}
          </MessageList>
          <MessageInput className={mainTheme !== 'light' ? 'message-input shadow' : 'message-input-light'} data-testid={'input'} placeholder='Type message here' onSend={handleSend} />
        </ChatContainer>
      </MainContainer>
    </div>
  )
}

export default Chat
