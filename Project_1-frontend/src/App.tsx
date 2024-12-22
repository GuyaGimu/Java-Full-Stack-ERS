import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login } from './Components/LoginRegister/Login'
import { Register } from './Components/LoginRegister/Register'
import { Reimbursements } from './Components/Reimbursements/Reimbursements'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <BrowserRouter>
          <Routes>

            <Route path='' element={<Login/>}/>
            <Route path='register' element={<Register/>}/>
            <Route path='reimbursements' element={<Reimbursements/>} />
          </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
