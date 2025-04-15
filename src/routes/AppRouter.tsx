import { Routes, Route } from "react-router-dom"
import Home from "../pages/Home"
import ModifyDir from "../pages/ModifyDir"
import Directions from "../pages/Directions"
import Profile from "../pages/profile"
import Login from "../pages/login"
import Signup from "../pages/NewReg"
import Cart from "../pages/Cart"
import Orders from "../pages/Orders"

const AppRouter = () => {
  return (
    <div className='p-4'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/modifydir' element={<ModifyDir />} />
        <Route path='/directions' element={<Directions />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/orders' element={<Orders />} />
        <Route
          path='/profile'
          element={
            <Profile
              username='John Doe'
              avatarUrl='https://example.com/avatar.jpg'
            />
          }
        />
      </Routes>
    </div>
  )
}

export default AppRouter
