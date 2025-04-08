import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import routes from './routesConfig'
import NotFound from '../pages/NotFound'

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default AppRouter