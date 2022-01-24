import "./App.css";
import { Route, Routes } from "react-router-dom";
import Settings from "../settings";
import Auth from "../auth";
import NoRoute from "../no.route";
import {
  Canvas,
  TopBar,
  AppBar,
  Layout,
  PrivateRoute,
  PublicRoute,
} from "./components";

function App() {
  return (
    <div className="App">
      <Layout>
        <TopBar />
        <AppBar />
        <Canvas>
          <Routes>
            <Route
              path="/auth/*"
              element={
                <PublicRoute>
                  <Auth />
                </PublicRoute>
              }
            />
            <Route
              path="/settings/*"
              element={
                <PrivateRoute>
                  <Settings />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<NoRoute />} />
          </Routes>
        </Canvas>
      </Layout>
    </div>
  );
}

export default App;
