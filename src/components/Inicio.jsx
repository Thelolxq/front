import React from 'react'
import { Link } from 'react-router-dom'
const Inicio = () => {
  return (
   <>
      <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Bienvenido</h1>
        <div className="flex justify-center">
          <Link to="/signin" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">Iniciar Sesión</Link>
          <Link to="/signup" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Registrarse</Link>
        </div>
      </div>
    </div>
   </>
  )
}

export default Inicio