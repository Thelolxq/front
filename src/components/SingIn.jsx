import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const SignIn = () => {
    const navigate = useNavigate()
 const [formData, SetFormData]= useState({
    correo:"",
    contraseña:""
 })
 const [error,  SetError]= useState(null)
  


const handleInciar = async()=>{
    SetError(null)
    try{
            const response = await axios.post("http://localhost:3000/alumnos/iniciar", formData)
            if(response.status=200){
                navigate('/room')
                const data = response.data
                localStorage.setItem('token', data.token)
            }else{
                SetError("Error iniciar");
            }
    }catch(err){
        SetError("error al iniciar sesion");
        console.error("error en el registro intentalo de nuevo", err)
    }
}
const handleInputChange = (e) => {
    SetError("")
    SetFormData(prevData => ({
      ...prevData,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (formData.correo.trim() === '' || formData.contraseña.trim() === '') {
      SetError("Todos los campos son obligatorios");
      return;
    }
    
    handleInciar();
  };

  return (
    <div className="flex justify-center flex-col items-center h-screen">
        <h2 className='font-bold text-2xl'>INICIAR SESION</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Correo</label>
          <input type="email" required name='correo' placeholder="Email" onChange={handleInputChange} value={formData.correo}  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Contraseña</label>
          <input type="password" required name='contraseña'  onChange={handleInputChange} value={formData.contraseña}  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        {error && <p className="text-red-500 font-bold ">{error}</p>}
        <div className="flex items-center justify-between">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Iniciar Sesión</button>
          <Link to="/signup" className="inline-block align-baseline font-bold pl-2 text-sm text-blue-500 hover:text-blue-800">¿No tienes una cuenta? Regístrate</Link>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
