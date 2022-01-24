import styled from "styled-components";
import { Routes, Route } from "react-router-dom";

import Controls from "./controls";
import UserInfo from "./user.info";

export default function Settings() {
  return (
    <Layout>
      <Controls />
      <Routes>
        <Route index element={<UserInfo />} />
      </Routes>
    </Layout>
  );
}

const Layout = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 1em;
`;
