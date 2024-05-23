import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import {adminRoutes, authRoutes, privateRoutes, publicRoutes} from "../routes";
import { MAINPAGE_ROUTE } from "../utils/consts";
import { Context } from "../index";
import {observer} from "mobx-react-lite";
import jwt_decode from "jwt-decode";

const checkRole = () => {
    const obj = jwt_decode(localStorage.getItem('token'))
    // console.log(obj.role)
    return obj.role
}

const AppRouter = observer(() => {
  const { user } = useContext(Context);

  return (
    <div className="bg-container">
        <div className="main-container">
          <Routes>
              {user.isAuth && checkRole() === "ADMIN" &&
                  adminRoutes.map(({ path, Component }) => (
                      <Route key={path} path={path} element={Component} exact />
                  ))
              }
              {user.isAuth &&
                  privateRoutes.map(({ path, Component }) => (
                      <Route key={path} path={path} element={Component} exact />
                  ))
              }
              {
                  publicRoutes.map(({ path, Component }) => (
                      <Route key={path} path={path} element={Component} exact />
                  ))
              }
              {!user.isAuth &&
                  authRoutes.map(({ path, Component }) => (
                      <Route key={path} path={path} element={Component} exact />
                  ))
              }
            <Route path="*" element={<Navigate to={MAINPAGE_ROUTE} />} />
          </Routes>
        </div>
    </div>
  );
});

export default AppRouter;
