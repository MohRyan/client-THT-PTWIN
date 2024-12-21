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
import { useCheckToken } from "@/lib/hooks/useCheckToken"
import { formSchema, IProductProps } from "./form-add-product"
import toast from "react-hot-toast"
import { UseUpdateImage } from "@/lib/hooks/useUpdateImageProductSupabase"
import { updateProduct } from "@/lib/api/call/product"

const FormUpdateProduct = ({ handleDialogClose, data }: IProductProps) => {
    const [selectedImageProduct, setSelectedImageProduct] = React.useState<File | null>(null);
    const [renderedImage, setRenderedImage] = React.useState<string | null>(data?.img_product || null);
    const token = localStorage.getItem("token")
    const { checkToken } = useCheckToken()
    const [loading, setLoading] = React.useState<boolean>(false)


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name_product: data?.name_product || "",
            price: data?.price?.toString() || "",
            description: data?.description || "",
            diskon: data?.diskon?.toString() || "0",
            rating: data?.rating?.toString() || "3",
        },

    })

    React.useEffect(() => {
        if (!selectedImageProduct) return
        const reader = new FileReader()
        reader.onload = (e) => setRenderedImage(e.target?.result as string)
        reader.readAsDataURL(selectedImageProduct)
    }, [selectedImageProduct])

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true)
        let image = ""
        if (selectedImageProduct !== null) {
            const filePath = data?.img_product.split("/THT-PTWIN/")[1]
            const res = await UseUpdateImage(filePath!, selectedImageProduct)
            image = res!
        }

        if (values.name_product === data?.name_product && values.price === data?.price?.toString() && values.description === data?.description && values.diskon === data?.diskon?.toString() && values.rating === data?.rating?.toString() && renderedImage === data?.img_product) {
            handleDialogClose()
            return toast('Tidak ada perubahan', {
                icon: '🤨',
            })
        }
        try {
            const newProduct = {
                name_product: values.name_product,
                img_product: image === "" ? data?.img_product : image,
                price: values.price,
                description: values.description,
                diskon: values.diskon,
                rating: values.rating,
            }
            await updateProduct(data!.id!, newProduct, token!)
            toast.success('Update Success')
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid items-start grid-cols-3 gap-6">
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
                    {loading ? 'Loading...' : 'Update Product'}
                </Button>
            </form>
        </Form>
    )
}

export default FormUpdateProduct