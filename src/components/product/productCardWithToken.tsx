import { Pencil, Trash2 } from "lucide-react"
import StarRating from "../start-rating"
import { IProduct } from "@/redux/types/state"
import { deleteProduct } from "@/lib/api/call/product"
import { useCheckToken } from "@/lib/hooks/useCheckToken"
import { useDeleteImageProduct } from "@/lib/hooks/useDeleteImageProductSupabase"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog"
import { Button } from "../ui/button"
import FormUpdateProduct from "./form-update-product"
import { useState } from "react"

const ProductCardWithToken = ({ data }: { data: IProduct }) => {
    const priceDiskon = data.price - (data.price * data.diskon! / 100)
    const token = localStorage.getItem('token')
    const { checkToken } = useCheckToken()
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleDialogClose = () => setIsOpen(false);
    async function handleDeleteProduct() {
        await deleteProduct(data.id, token!)
        if (data.img_product.includes("THT-PTWIN")) {
            await useDeleteImageProduct(data.img_product.split("/THT-PTWIN/")[1])
        }
        checkToken(token!)
    }
    return (
        <div className="flex flex-col justify-between col-span-6 p-4 border border-gray-300 rounded-lg md:col-span-2 lg:col-span-1">
            <div className="flex relative h-[50%] w-[100%] min-h-52 rounded-t-lg bg-cover" style={{ backgroundImage: `url('${data.img_product}')` }}>
                {data.diskon &&
                    <div className="z-0 w-full text-black bg-red-400 card-product-clip">
                        <b className="absolute z-20 text-white -rotate-45 top-1.5 left-0.5">{data.diskon}%</b>
                    </div>
                }
                <div className="absolute flex items-center gap-2 -top-2 -right-2">
                    <Dialog>
                        <DialogTrigger className="p-2 bg-white rounded-full hover:text-red-500"><Trash2 /></DialogTrigger>
                        <DialogContent className="max-w-lg">
                            <DialogHeader>
                                <DialogTitle className="text-2xl">Delete Product</DialogTitle>
                                <div>
                                    <p className="text-xl">Are you sure you want to delete this product?</p>
                                    <div className="flex gap-4 p-5 justify-evenly">
                                        <DialogClose className="inline-flex items-center justify-center w-1/2 text-sm font-medium transition-colors border rounded-md whitespace-nowrap ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-input bg-background hover:bg-accent hover:text-accent-foreground">
                                            Batal
                                        </DialogClose>
                                        <Button className="w-1/2" onClick={handleDeleteProduct} variant={"destructive"}>Delete</Button>
                                    </div>
                                </div>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                    <Dialog open={isOpen} onOpenChange={setIsOpen}>
                        <DialogTrigger className="flex items-center justify-center p-2 bg-white rounded-full shadow-xl"><Pencil /></DialogTrigger>
                        <DialogContent >
                            <DialogHeader>
                                <DialogTitle className="py-6">Edit Product</DialogTitle>
                                <FormUpdateProduct handleDialogClose={handleDialogClose} data={data} />
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
            <div className="flex flex-col gap-4 mt-2">
                <b className="line-clamp-2">{data.name_product}</b>
                {data.diskon === null ?
                    <span className="text-2xl ">Rp. {Number(data.price).toLocaleString('id-ID')}</span>
                    :
                    <div className="flex flex-col justify-between">
                        <span className="text-lg text-gray-400 line-through">Rp. {Number(data.price).toLocaleString('id-ID')}</span>
                        <span className="text-2xl ">Rp. {priceDiskon.toLocaleString('id-ID')}</span>
                    </div>
                }
                <div className="flex items-center justify-between gap-2 text-base">
                    <div className="flex items-center gap-2">
                        <span className="text-yellow-500">{data.rating}</span>
                        <StarRating valueRating={data.rating} />
                    </div>
                    <span className="text-sm">{data.sku}</span>
                </div>
                <p className="line-clamp-3">{data.description}</p>
            </div>
        </div>
    )
}

export default ProductCardWithToken