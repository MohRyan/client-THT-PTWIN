import { Link } from "react-router-dom";
import ProfileNav from "../profile";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "../ui/input";
import InputPassword from "../inputPassword";
import { loginAsync } from "@/redux/async/authAsync";
import { useAppDispatch } from "@/redux";
import { useCheckToken } from "@/lib/hooks/useCheckToken";

const formSchema = z.object({
  email: z.string().email("Invalid email").min(2).max(20),
  password: z.string().min(2).max(20, "Password must be less than 20 characters"),
})

const Login = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [toggle, setToggle] = useState<boolean>(false);
  const dispatch = useAppDispatch()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })
  const token = localStorage.getItem('token');
  const { checkToken } = useCheckToken()
  const [isToken, setIsToken] = useState<string | null>(token || null)
  useEffect(() => {
    if (token) {
      setIsToken(token)
    } else {
      setIsToken(null)
      setToggle(false)
      form.setValue('email', '')
      form.setValue('password', '')
    }
  }, [token])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)
    try {
      dispatch(loginAsync(values))
      toast.success('Login Success')

    } catch (error) {
      toast.error('Login Failed')
    } finally {
      setTimeout(() => {
        const token = localStorage.getItem('token');
        setLoading(false)
        checkToken(token!)
      }, 5000)
    }
  }
  return (
    <div className="">
      {isToken ?
        <ProfileNav setIsToken={setIsToken} />
        :
        <div className="flex gap-3">
          {toggle ?
            <div className="flex items-center gap-3">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-3">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Enter Your Email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <InputPassword field={field} placeholder="Enter Your Password" />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={loading}>
                    {loading ? 'Loading...' : 'Login'}
                  </Button>
                </form>
              </Form>
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
