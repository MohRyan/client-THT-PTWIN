import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import AuthLayout from "./layout/AuthLayout";
import Home from "./pages";
import Profile from "./pages/profile";
import Register from "./pages/auth/register";
import MyProduct from "./pages/my-product";
import { ReactNode } from "react";

const ProtectedRoute = ({ children }: {
  children: ReactNode
}) => {
  const token = localStorage.getItem('token')
  return !token ? <Navigate to="/" /> : children;
};
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<AuthLayout />}>
            <Route index element={<Register />} />
          </Route>

          <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="my-product" element={<ProtectedRoute><MyProduct /></ProtectedRoute>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
