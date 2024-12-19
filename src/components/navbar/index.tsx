import { Link } from "react-router-dom";
import Login from "../auth/Login";


const Navbar = () => {
  return (
    <div className="flex items-center justify-between gap-2 px-5 py-2 bg-blue-200">
      <Link to={'/'} className="text-2xl pacifico">MyStore</Link>
      <Login />
    </div>
  );
};

export default Navbar;
