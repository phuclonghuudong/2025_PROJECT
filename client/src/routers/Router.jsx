import React from "react";
import AuthRouter from "./AuthRouter";
import MainRouter from "./MainRouter";

const Router = () => {
  return 2 > 1 ? <AuthRouter /> : <MainRouter />;
};

export default Router;
