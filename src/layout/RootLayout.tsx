import Footer from "@/components/footer";
import Header from "@/components/header";
import Navbar from "@/components/navbar";
import { useCheckToken } from "@/lib/hooks/useCheckToken";
import { CircleArrowUp } from "lucide-react";
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
      <nav className="nav" >
        <Navbar />
      </nav>
      <main>
        <Outlet />
      </main>
      <Footer />
      <div className="container fixed flex justify-end bottom-5">
        <a href="#header">
          <CircleArrowUp size={40} className="p-2 bg-white rounded-full w-14 h-14 hover:bg-gray-200" />
        </a>
      </div>
    </div>
  );
};

export default RootLayout;
