import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login } from './Components/LoginRegister/Login'
import { Reimbursements } from './Components/Reimbursements/Reimbursements'
import { ManagerDashboard } from './Components/Dashboard/ManagerDashboard'
import { EmployeeDashboard } from './Components/Dashboard/EmployeeDashboard'
import { RegisterUser } from './Components/LoginRegister/Register'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <BrowserRouter>
          <Routes>

          <Route path="/" element={<Login />} />
          <Route path="reimbursement" element={<Reimbursements />} />
          <Route path="register" element={<RegisterUser/>} />
          <Route path="/manager-dashboard" element={<ManagerDashboard/>} />
          <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
          </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
