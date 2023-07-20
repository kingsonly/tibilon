import { privateRoutes } from "./privateRoutes";
import { authRoutes } from "./authRoutes";
import { clientPrivateRoutes } from "./clientPrivateRoutes";


export const PrivateAdminRoute = ({ children }) => {
	//check for authentication/permission before return
  return <>{children}</>;
};

export const routes = {
  authRoutes,
  privateRoutes,
  clientPrivateRoutes,
};
