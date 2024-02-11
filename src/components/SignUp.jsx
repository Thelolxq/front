import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const SignUp = () => {
  const navigate = useNavigate()
  const [error, SetError] = useState(null)
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '', 
    contraseña: '',
  });

    const handleRegistrarse = async()=>{
      SetError(null)
        try{
            const response = await axios.post('http://localhost:3000/alumnos', formData)

            if(response.status=== 200){
              alert("usuario creado correctamente")
              navigate('/signin')
            }else{
            
              SetError("Error al crear usuario");
              
            }
        }catch(err){
          SetError("error en el registro");
          console.error("error en el registro intentalo de nuevo")
        }
    }
   const handleInputChange = (e) => {
    SetError("")
    setFormData(prevData => ({
      ...prevData,
      [e.target.name]: e.target.value
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (formData.nombre.trim() === '' || formData.correo.trim() === '' || formData.contraseña.trim() === '') {
      SetError("Todos los campos son obligatorios");
      return;
    }
    
    handleRegistrarse();
  };


  return (
    <div className="flex justify-center flex-col items-center h-screen">
      <h2 className='font-bold text-2xl'>REGISTRARSE</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-md  rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Usuario</label>
          <input type="text" name='nombre' onChange={handleInputChange} value={formData.nombre} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Correo</label>
          <input type="text" name='correo' onChange={handleInputChange} value={formData.correo} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Contraseña</label>
          <input type="password" name='contraseña' onChange={handleInputChange} value={formData.contraseña}  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        {error && <p className="text-red-500 font-bold ">{error}</p>}
        <div className="flex items-center justify-between">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Registrarse</button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
