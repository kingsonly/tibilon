import ComposeInternalClientLayouts from "../components/HOC/ComposeInternalClientLayouts";
import ClientProjects from "../pages/ClientAdmin/ClientProjects";
import ClientDocumet from "../pages/ClientAdmin/ClientDocumet";

import Dashboard from "../pages/ClientAdmin/Dashboard";
import ClientProperties from "../pages/ClientAdmin/ClientProperties";

export const clientPrivateRoutes = [
  {
    title: "Dashboard",
    path: "/clientdashboard",
    component: ComposeInternalClientLayouts(Dashboard),
    exact: true,
  },
  {
    title: "Projects",
    path: "/clientadmin/project",
    component: ComposeInternalClientLayouts(ClientProjects),
    exact: true,
  },
  {
    title: "Document",
    path: "/client/document/:id",
    component: ComposeInternalClientLayouts(ClientDocumet),
    exact: true,
  },
  {
    title: "Property",
    path: "clientadmin/property",
    component: ComposeInternalClientLayouts(ClientProperties),
    exact: true,
  },
];
