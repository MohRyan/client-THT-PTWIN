import Login from "../auth/Login";


const Navbar = () => {
  return (
    <div className="flex items-center justify-between gap-2 px-5 py-2 bg-blue-200">
      <b className="text-xl pacifico">MyStore</b>
      <Login />
    </div>
  );
};

export default Navbar;
