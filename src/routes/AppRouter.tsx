import { Routes, Route } from "react-router-dom"
import Home from "../pages/home"
import ModifyDir from "../pages/ModifyDir"
import Directions from "../pages/Directions"
import Profile from "../pages/profile"

const AppRouter = () => {
  return (
    <div className='p-4'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/modifydir' element={<ModifyDir />} />
        <Route path='/directions' element={<Directions />} />
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
