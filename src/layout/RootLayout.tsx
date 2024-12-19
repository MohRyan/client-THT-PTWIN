import Footer from "@/components/footer";
import Header from "@/components/header";
import Navbar from "@/components/navbar";
import { useCheckToken } from "@/lib/hooks/useCheckToken";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  window.addEventListener("scroll", function () {
    const header = this.document.querySelector("nav");
    header?.classList.toggle("navFixed", this.window.scrollY > 0);
  });
  const token = localStorage.getItem("token");
  const { checkToken } = useCheckToken();
  if (token) {
    useEffect(() => {
      checkToken(token);
    }, []);
  }
  return (
    <div className="container p-0">
      <Header />
      <nav className="nav">
        <Navbar />
      </nav>
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
