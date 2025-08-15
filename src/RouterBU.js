import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from "./screens/Home";
import Login from "./screens/Login";
import NotFound from "./screens/NotFound";
import Layout from "./components/Layout";
import Match from "./screens/Match";
import Profile from "./screens/Profile";
import PhotoTest from "./screens/PhotoTest";
import Outcluber from "./screens/Outcluber";
import Notification from "./screens/Notification";
import GameFeed from "./screens/match/GameFeed";
import Root from "./Root";
import Tesss from "./screens/Tesss";
import routes from "./routes";
import SignUp from './screens/SignUp';

const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "/match",
          element: <Match />,
          children: [
            {
              path: "/match/:id",
              element: <GameFeed />,
            },
          ],
        },
        {
          path: "/match/:id",
          element: <GameFeed />,
        },
        {
          path: "/users/:username",
          element: <Profile />,
        },
        {
          path: "/outcluber",
          element: <Outcluber />,
        },
        {
          path: "/notification",
          element: <Notification />,
        },
        {
          path: "/photo",
          element: <PhotoTest />,
        },
        
      ],


    },

   
    
  ]);


export default router;