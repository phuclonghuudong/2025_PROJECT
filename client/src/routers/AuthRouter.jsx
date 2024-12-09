import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login, Register } from "../screens";
import IMG from "../assets/image51.png";
import { Typography } from "antd";

const { Text, Title } = Typography;

const AuthRouter = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col d-none d-lg-block text-center">
          <img src={IMG} alt="" style={{ width: 300, objectFit: "cover" }} />
          <Title className="text-center" type="warning" level={1}>
            PHP'S SHOESSHOP
          </Title>
        </div>

        <div className="col content-center mt-4">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/dang-ky" element={<Register />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </div>
  );
};

export default AuthRouter;
