import { createBrowserRouter } from 'react-router-dom';
import Login from "./screens/Login";
import SignUp from './screens/SignUp';

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
