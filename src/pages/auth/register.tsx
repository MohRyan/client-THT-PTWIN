import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import InputPassword from "@/components/inputPassword"
import { API } from "@/lib/api"

const formSchema = z.object({
    name: z.string().min(2).max(50, "Name must be less than 50 characters"),
    email: z.string().email("Invalid email").min(2).max(20),
    password: z.string().min(2).max(20, "Password must be less than 20 characters"),
    confirmPassword: z.string().min(2).max(20, "Password must be less than 20 characters"),
})
    .refine(data => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"], // Path to show the error
    });

const Register = () => {
    const navigate = useNavigate();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log("🚀 ~ onSubmit ~ values:", values)
        const valueRegister = {
            name: values.name,
            email: values.email,
            password: values.password
        }
        try {
            await API.post("register", valueRegister)
            toast.success('Register Success')
            navigate("/")

        } catch (error) {
            toast.error('Register Failed')
        }
    }
    return (
        <div className="container flex items-center justify-center w-full h-screen">
            <div className="flex flex-col p-10 bg-gray-300 rounded-lg">
                <b className="pb-5 text-3xl">Register</b>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input className="min-w-60" placeholder="Enter your Name" {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
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
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <InputPassword field={field} placeholder="Enter Your Password" />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <InputPassword field={field} placeholder="Confirm Password" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default Register