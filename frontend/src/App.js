import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routes, PrivateAdminRoute } from "./routes";
import Sidebar from "./components/SideBar/SideBar";
import { useNavigate } from 'react-router-dom';
import { SideBarLinks } from "./sideBarLinks";
import { SideBarClientLinks } from "./sideBarClientLinks";


function App() {
  
  const clientPrivateRoutes = routes.clientPrivateRoutes.map(
    ({ path, title, component: Component, exact }) => (
      <Route
        key={path}
        exact={exact}
        path={path}
        element={
          <PrivateAdminRoute path={path} key={path} exact={exact} title={title}>
            <Component title={title} />
            <Sidebar SideBarLinks={SideBarClientLinks} />
          </PrivateAdminRoute>
        }
      />
    )
  );
  const privateRoutes = routes.privateRoutes.map(
    ({ path, title, component: Component, exact }) => (
      <Route
        key={path}
        exact={exact}
        path={path}
        element={
          <PrivateAdminRoute path={path} key={path} exact={exact} title={title}>
            <Component title={title} />
            <Sidebar SideBarLinks={SideBarLinks} />
          </PrivateAdminRoute>
        }
      />
    )
  );

  const authRoutes = routes.authRoutes.map(
    ({ path, component: Component, exact }) => (
      <Route path={path} key={path} exact={exact} element={<Component />} />
    )
  );

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {authRoutes}
          {clientPrivateRoutes}
          {privateRoutes}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
