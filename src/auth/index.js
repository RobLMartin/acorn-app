import styled from "styled-components";
import Login from "./login";
import ForgotPassword from "./forgot.password";
import SignUp from "./sign.up";

import { Routes, Route } from "react-router-dom";
export default function Auth() {
  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="signup" element={<SignUp />} />
    </Routes>
  );
}