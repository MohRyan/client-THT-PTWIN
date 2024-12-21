import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import AuthLayout from "./layout/AuthLayout";
import Home from "./pages";
import Profile from "./pages/profile";
import Register from "./pages/auth/register";
import MyProduct from "./pages/my-product";
import { ReactNode } from "react";
import { jwtDecode } from 'jwt-decode';
import ExpiredToken from "./pages/expiredToken";

interface ProtectedRouteProps {
  children: ReactNode;
  redirectTo: string;
  redirectExpiredTo?: string;
}


export const isTokenExpiredWithinDays = (token: string | null, days: number): boolean => {
  if (!token) return true;

  try {
    const decoded: { iat: number } = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);
    const expiryTime = decoded.iat + days * 24 * 60 * 60;
    return currentTime > expiryTime;
  } catch (error) {
    console.error('Invalid token:', error);
    return true;
  }
};

const ProtectedRoute = ({
  children,
  redirectTo,
  redirectExpiredTo = redirectTo,
}: ProtectedRouteProps) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to={redirectTo} />;
  }

  if (isTokenExpiredWithinDays(token, 2)) {
    localStorage.removeItem('token');
    return <Navigate to={redirectExpiredTo} />;
  }

  return children;
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
            <Route path="profile" element={<ProtectedRoute redirectTo="/" redirectExpiredTo="/expiredToken"><Profile /></ProtectedRoute>} />
            <Route path="my-product" element={<ProtectedRoute redirectTo="/" redirectExpiredTo="/expiredToken"><MyProduct /></ProtectedRoute>} />
          </Route>
          <Route path="/expiredToken" element={<ExpiredToken />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
