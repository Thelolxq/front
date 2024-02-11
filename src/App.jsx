import React from 'react'

import SignUp from './components/SignUp'
import SignIn from './components/SingIn'
import Inicio from './components/Inicio'
import Chat from './components/Chat'
import Rooms from './components/Rooms'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
const App = () => {

  return (
    <>
   <Router>
    <Routes>
      <Route path='/' element={<Inicio/>}/>
      <Route path='/signup' element={<SignUp/>} />
      <Route path='/signin' element={<SignIn/>} />
      <Route path='/room' element={<Rooms/>} />
    </Routes>
   </Router>
    </>
  )
}

export default App