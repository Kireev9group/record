import React, { useContext } from "react";
import { Route, Navigate, Routes } from "react-router-dom";
import { routes } from "../routes";
import { SHOP_ROUTE } from "../utils/consts";
import { Context } from "../index";

const AppRouter = () => {
  const { user } = useContext(Context);

  console.log(user);
  return (
    <Routes>
      {routes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} exact />
      ))}
      <Route path="*" element={<Navigate to={SHOP_ROUTE} />} />
    </Routes>
  );
};

export default AppRouter;
