import { createBrowserRouter } from 'react-router-dom';
import Login from "./screens/auth/Login";
import SignUp from './screens/auth/SignUp';

const authRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/sign-up",
      element: <SignUp />,
    },
]);

export default authRouter;
