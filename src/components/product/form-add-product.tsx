import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Textarea } from "../ui/textarea"
import { ImagePlus } from "lucide-react"

const formSchema = z.object({
    name_product: z.string().min(10).max(60),
    price: z.number({
        required_error: "Price is required",
    }),
    description: z.string().min(20).max(300),
    diskon: z.number().optional(),
    rating: z.number().min(1).max(5).default(3),
})
const FormAddProduct = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name_product: "",
            price: 0,
            description: "",
            diskon: 0,
            rating: 3

        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {

    }
    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid items-start grid-cols-3 gap-6">
                    <label htmlFor="img-product" className="flex items-center justify-center row-span-2 border border-gray-300 rounded-lg max-w-52 min-h-52">
                        <ImagePlus size={40} />
                        <input type="file" id="img-product" className="hidden" />
                    </label>
                    <FormField
                        control={form.control}
                        name="name_product"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Produk Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter Your Product Name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Product Price</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter Your Price" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="diskon"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Diskon <span className="text-red-500">*</span></FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter Your Product Name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="rating"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Product Rating</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter Your Price" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem className="col-span-3">
                                <FormLabel>Description Product</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Tell us a little bit about yourself"
                                        className="resize-none"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* <Button type="submit" disabled={loading}>
                    {loading ? 'Loading...' : 'Login'}
                  </Button> */}
                    <Button type="submit" >
                        Submit
                    </Button>
                </form>
            </Form>
        </div>
    )
}

export default FormAddProduct