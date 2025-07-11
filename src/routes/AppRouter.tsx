import { Routes, Route } from "react-router-dom"
import Home from "../pages/home"
import ModifyDir from "../pages/ModifyDir"
import Directions from "../pages/Directions"
import Profile from "../pages/profile"
import Login from "../pages/login"
import Signup from "../pages/NewReg"
import Cart from "../pages/Cart"
import Orders from "../pages/Orders"
import OrderDetailWrapper from "../components/OrderDetailWrapper"
import Checkout from "../pages/Checkout"
import AdminView from "../pages/admin_view"
import AdminOrders from "../pages/admin_orders"
import AdminUsers from "../pages/admin_users"
import AdminProducts from "../pages/admin_products"

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
        <Route path='/orders/:orderId' element={<OrderDetailWrapper />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/admin' element={<AdminView />} />
        <Route path='/admin_orders' element={<AdminOrders />} />
        <Route path='/admin_users' element={<AdminUsers />} />
        <Route path='/admin_products' element={<AdminProducts />} />
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
