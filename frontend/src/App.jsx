import {Routes, Route, Navigate} from "react-router"
import AuthLayout from "./components/Layout/AuthLayout.jsx"
import Login from "./pages/Auth/Login.jsx"
import Register from "./pages/Auth/Register.jsx"
const App = () => {
  return (
    <Routes>
      <Route path="/auth" element={<Navigate to="/auth/login" replace />} />
      <Route path="/auth" element={<AuthLayout/>}> 
        <Route path="login" element={<Login/>}/>
        <Route path="register" element={<Register/>}/>
      </Route>
    </Routes>
  )
}

export default App
