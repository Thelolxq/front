import React, {useEffect, useState} from 'react'
import entrar from '../assets/vinculado.png'
import {io} from 'socket.io-client'
import Chat from './Chat'
import axios from 'axios'
import eliminar from '../assets/boton-eliminar.png'
const Rooms = () => {

    
    
    const [socket, SetSocket] = useState(null)
    const [room, SetRoom] = useState('')
    const [joinedRoom, SetJoinedRoom] = useState(false)
    const [usuarios, SetUsuarios] = useState([])
    const [selectedUser, SetSelectedUser] = useState(null);
    const [notification, SetNotification] = useState(false)
    const [conectados, SetConectados] = useState()

useEffect(()=>{
    FechData()
    GetData()
    
},[notification])
useEffect(() => {
    const newSocket = io('http://localhost:3000');
    SetSocket(newSocket);
    GetConect()
    return () => {
       
        newSocket.close();
    };
}, []);
const FechData = async () => {
    try{
            const response = await axios.get('http://localhost:3000/alumnos')
            SetNotification(true)
            SetUsuarios(response.data)
    }catch(err){
            console.error('error en la peticion', err)
    }
}
const GetData = async ()=>{
    try{
        const response = await axios.get('http://localhost:3000/maestros/notificacion')
        SetNotification(response)
        GetData()
    }catch(err){
        console.error('error en la peticion', err)
    }
}

const EliminarData = async (id_alumno)=>{
    try{
        const response = await axios.delete(`http://localhost:3000/maestros/${id_alumno}`)
         console.log('Usuario eliminado:', response);
         FechData()
    }catch(err){
            console.error('error en la peticion', err)
    }
}
const GetConect = async ()=>{
    try{
        const response = await axios.get('http://localhost:3000/shortPolling')
        SetConectados(response.data.clientes)
       setTimeout(GetConect, 5000)
    }catch(err){
        console.error('error en la peticion', err)
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

    const handleUserSelect = (user)=>{
            SetSelectedUser(user)
    }
   
  
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
                    <h2 className='text-gray-500 pl-2 mb-4 text-lg'>Usuarios conectados {conectados}</h2>
                <ul className='pl-5 pr-5'>
                    <h2 className='text-gray-500 pl-2 mb-4 text-lg'>Usuarios registrados</h2>
              {!joinedRoom && usuarios.map((user)=>(
                
                    <li className='relative' key={user.id_alumno}>
                <button onClick={()=> handleUserSelect(user)}  className={`text-white h-10 items-center font-medium text-lg w-full  flex  pl-2 rounded-md ${selectedUser === user ? 'bg-neutral-700' : ''}`}>
                        {user.nombre}
                </button>
                <button onClick={()=> EliminarData(user.id_alumno)} className='w-8 h-full absolute right-0 top-0'><img src={eliminar} alt="" /></button>
                    </li>
                
                
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