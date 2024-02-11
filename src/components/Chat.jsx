import React, { useEffect, useState } from 'react'
import enviar from '../assets/enviar.png'

const Chat = ({socket, room}) => {

  const [message, SetMessage] = useState('')
  const [messages, SetMessages] = useState([])
  const [recentMessages, SetRecentMessages] = useState([])

    const handleMessageChange = (e) => {
        SetMessage(e.target.value)

    }

    const handleSendMessage = () => {
      if (message.trim() !== '') {
          socket.emit('message', { body: message, room: room}); 
          SetMessage('');
      }
  };


  useEffect(() => {
    console.log("sala:",room)
    const handleNewMessage = (newMessage) => {
      if (newMessage.room === room) {
        console.log("Nuevo mensaje:", newMessage);
        SetMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    };

    socket.on('message', handleNewMessage);

      socket.on('recentMessages', (messages)=>{
            SetRecentMessages(messages)
      } )
    


    return () => {
      socket.off('message', handleNewMessage);
    };
  }, [socket, room]);

  return (
    <>
     <div className='h-full relative flex justify-center items-center w-full'>
      <div className='w-3/4 rounded-md h-5/6 p-20 overflow-auto bg-neutral-950 bg-opacity-80 shadow-xl'>
        <h2 className="text-white  mb-10 text-left uppercase font-medium text-lg border-b"> {room}</h2>
        {recentMessages.map((msg, index) => (
        <div key={index} className='bg-blue-900 bg-opacity-50 h-10 flex mb-3 items-center w-fit pl-5 pr-5 rounded-tl-2xl rounded-tr-2xl rounded-br-2xl'>
          <p className='text-white text-lg'>{msg.body}</p>
        </div>
        ))}

        {messages.map((msg, index)=>{
          return (

        <div key={index} className='bg-blue-900 bg-opacity-50 h-10 flex mb-3 items-center w-fit pl-5 pr-5 rounded-tl-2xl rounded-tr-2xl rounded-br-2xl'>
          <p className='text-white text-lg'>
           {msg.body}
          </p>
        </div>
          )
        })}
       
      </div>
      <div className='absolute bottom-0 w-3/4 flex p-2'>
      <input 
      value={message}
      onChange={handleMessageChange}
      className=' text-white bg-neutral-800 border-gray-500 border w-full pl-2 relative rounded-md h-12 text-lg' 
      type="text" 
      placeholder='Escriba un mensaje...'/>
      <button 
      onClick={handleSendMessage}
      className='w-20 h-12 text-white rounded-md flex items-center justify-center absolute right-0 '
      ><img className='w-8 h-8' 
      src={enviar} alt="" />
      </button>
      </div>
     </div>
    </>
  )
}

export default Chat