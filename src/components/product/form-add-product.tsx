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
import React from "react"
import { UseUploadImage } from "@/lib/hooks/useUploadImageSupabase"
import { API } from "@/lib/api"
import { useCheckToken } from "@/lib/hooks/useCheckToken"
import { IProduct } from "@/redux/types/state"

export interface IProductProps {
    handleDialogClose: () => void,
    data?: IProduct
}

export const formSchema = z.object({
    name_product: z.string().min(10).max(200),
    price: z.string({
        required_error: "Price is required",
    }).min(2, "Price must be at least 3 Number"),
    description: z.string().min(20).max(300),
    diskon: z.string().optional(),
    rating: z.string().min(1).max(5).default("3"),
})
const FormAddProduct = ({ handleDialogClose }: IProductProps) => {
    const [selectedImageProduct, setSelectedImageProduct] = React.useState<File | null>(null);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name_product: "",
            price: "",
            description: "",
            diskon: "0",
            rating: "3",

        },
    })
    const [renderedImage, setRenderedImage] = React.useState<string | null>(null);
    const token = localStorage.getItem("token")
    const { checkToken } = useCheckToken()
    const [loading, setLoading] = React.useState<boolean>(false)

    React.useEffect(() => {
        if (!selectedImageProduct) return
        const reader = new FileReader()
        reader.onload = (e) => setRenderedImage(e.target?.result as string)
        reader.readAsDataURL(selectedImageProduct)
    }, [selectedImageProduct])




    async function OnSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true)
        let image = "https://www.mon-site-bug.fr/uploads/products/default-product.png"
        if (selectedImageProduct !== null) {
            const res = await UseUploadImage(selectedImageProduct!)
            image = res!
        }
        const addProduct = {
            name_product: values.name_product,
            img_product: image,
            price: values.price,
            description: values.description,
            diskon: values.diskon,
            rating: values.rating,
        }
        try {
            await API.post("product", addProduct, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            checkToken(token!)
            handleDialogClose()
        } catch (error) {
            console.log("🚀 ~ onSubmit ~ error:", error)
        } finally {
            setLoading(false)
        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(OnSubmit)} className="grid items-start grid-cols-3 gap-6">
                <label htmlFor="img-product" className="flex items-center justify-center row-span-2 bg-center bg-cover border border-gray-300 rounded-lg max-w-52 min-h-52" style={{ backgroundImage: `url('${renderedImage}')` }}>
                    {!renderedImage &&
                        <ImagePlus size={40} />
                    }
                    <input onChange={(e) => setSelectedImageProduct(e.target.files![0])} type="file" id="img-product" className="hidden" />
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
                                <Input type="number" placeholder="Enter Your Price" {...field} />
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
                                <Input type="number" placeholder="Enter Your Diskon" {...field} />
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
                                <Input type="number" placeholder="Rating" {...field} />
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
                <Button type="submit" disabled={loading}>
                    {loading ? 'Loading...' : 'Add'}
                </Button>
            </form>
        </Form>
    )
}

export default FormAddProduct