import Login from "../pages/auth/Login";
import ClientLogin from "../pages/auth/ClientLogin";


export const authRoutes = [
  {
    path: '/',
    component: Login,
    exact: true,
  },
  {
    path: '/clientlogin',
    component: ClientLogin,
    exact: true,
  },
];
