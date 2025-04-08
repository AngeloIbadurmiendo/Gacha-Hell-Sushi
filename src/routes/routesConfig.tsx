import Directions from "../pages/Directions"
import Home from "../pages/home"
import ModifyDir from "../pages/ModifyDir"
import Profile from "../pages/profile"

const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/modifydir",
    element: <ModifyDir />,
  },
  {
    path: "/directions",
    element: <Directions />,
  },
  {
    path: "/profile",
    element: <Profile username='John Doe' avatarUrl='...' />,
  },
]

export default routes
