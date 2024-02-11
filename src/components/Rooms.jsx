import React, {useEffect, useState} from 'react'
import entrar from '../assets/vinculado.png'
import {io} from 'socket.io-client'
import Chat from './Chat'
import axios from 'axios'
const Rooms = () => {

    
    
    const [socket, SetSocket] = useState(null)
    const [room, SetRoom] = useState('')
    const [joinedRoom, SetJoinedRoom] = useState(false)
    const [roomList, SetRoomList] = useState([])
    const [selectedRoom, setSelectedRoom] = useState(null);

useEffect(()=>{
    const newSocket = io('http://localhost:3000')
    SetSocket(newSocket)
    FechData()
    return ()=>{
        newSocket.close()
    }
},[])

const FechData = async ()=>{
    try{
        const response = await axios.get('http://localhost:3000/rooms')
        
        SetRoomList(response.data)
    }catch(err){
            console.error('error obteniendo las salas',  err)
    }
}
    const handleNameRoomChange = (e) => {
        SetRoom(e.target.value)
        
    }
    const handleJoinRoom = () => {
        if(room.trim() !==''){

            socket.emit('joinRoom', room)
           SetJoinedRoom(true)
        }
        
    }
    const handleRoomButtonClick = (roomName) => {
        setSelectedRoom(roomName); 
        SetRoom(roomName); 
    };

  
  return (
    <>
    <div className='flex h-screen w-screen justify-center items-center'>
        <div className='h-full w-full bg-neutral-900 flex'>
            <aside className='h-full bg-neutral-950 w-80  left-0'>
                <div className='flex flex-col w-full relative justify-center p-5 items-center'>
                   <button 
                   onClick={()=> SetJoinedRoom(false)}
                   className='text-white text-lg rounded-xl text-left font-medium pl-2 hover:bg-neutral-800 w-full h-12'>
                    Nuevo Chat
                    </button>
                    {!joinedRoom && (
                        <>
                        <div className='flex gap-2 mt-5'>
                            <input 
                            value={room}
                            onChange={handleNameRoomChange}
                            className='bg-transparent text-white border-white border h-10 text rounded-md w-62 pl-2 placeholder:text-gray'
                             type="text" placeholder='Nombre de la sala...' />
                            <button onClick={handleJoinRoom} className='  h-10 w-10 rounded-full  '>
                                <img className='w-full h-full' src={entrar} alt="" />
                                </button>
                        </div>
                        </>
            
                    )}
                </div>
                    <h2 className='text-gray-500 pl-2 text-lg'>Salas creadas</h2>
                <ul className='pl-5 pr-5'>
                {!joinedRoom && roomList.map((roomName, index) => (
                                <button key={index} onClick={() => handleRoomButtonClick(roomName)} className={`flex flex-col  mb-2 bg-opacity-65 w-full h-10 justify-center pl-5 rounded-xl ${selectedRoom === roomName ? 'bg-neutral-700' : ''}`}>
                                    <li className="text-white">{roomName}</li>
                                </button>
                            ))}
                </ul>
               
            </aside>
            {joinedRoom && <Chat  socket={socket} room={room}/>}
        </div>
    </div>
    
    </>
  )
}

export default Rooms