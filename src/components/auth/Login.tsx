import { Link } from "react-router-dom";
import ProfileNav from "../profile";
import { Button } from "../ui/button";
import { useState } from "react";
import { X } from "lucide-react";

const Login = () => {
  const token = localStorage.getItem('token');
  const [toggle, setToggle] = useState<boolean>(false);

  return (
    <div className="">
      {token ?
        <ProfileNav />
        :
        <div className="">
          {toggle ?
            <div className="flex items-center gap-3">
              <input type="text" placeholder="Email" className="p-2 rounded-md" />
              <input type="text" placeholder="Password" className="p-2 rounded-md" />
              <X className="w-8 h-8 p-2 bg-white rounded-full cursor-pointer" onClick={() => setToggle(false)} />
            </div>
            :
            <div className="flex items-center gap-3">
              <Link to={'/register'} className="px-5 py-2 bg-white rounded-lg">Register</Link>
              <Button className="px-5" onClick={() => setToggle(true)}>
                Login
              </Button>
            </div>
          }
        </div>
      }
    </div>
  )
};

export default Login;
