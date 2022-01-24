import styled from "styled-components";
import Login from "./login";
import ForgotPassword from "./forgot.password";
import SignUp from "./sign.up";

import { Routes, Route } from "react-router-dom";
export default function Auth() {
  return (
    <Container>
      <AuthPanel>
        <Routes>
          <Route index element={<Login />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="signup" element={<SignUp />} />
        </Routes>
      </AuthPanel>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 700px 1fr;
  height: 100%;
`;

const AuthPanel = styled.div`
  background-color: white;
  height: 100%;
  display: grid;
  place-items: center;
  padding: 0 6em;
`;
