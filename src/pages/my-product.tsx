import FormAddProduct from "@/components/product/form-add-product"
import ProductCardWithToken from "@/components/product/productCardWithToken"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useCheckToken } from "@/lib/hooks/useCheckToken"
import { useAppSelector } from "@/redux"
import { PackagePlus } from "lucide-react"
import { useEffect, useState } from "react"

const MyProduct = () => {
    const { product } = useAppSelector(state => state.auth.user)
    const { checkToken } = useCheckToken()
    const token = localStorage.getItem('token')
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const handleDialogClose = () => setIsOpen(false);
    useEffect(() => {
        function check() {
            checkToken(token!)
        }
        check()
    }, [token])

    return (
        <div>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger className="flex items-center justify-center gap-5 p-3 px-5 my-4 bg-white shadow-xl hover:bg-blue-200 rounded-2xl"><PackagePlus /> <b>Add Product</b></DialogTrigger>
                <DialogContent >
                    <DialogHeader>
                        <DialogTitle className="py-6 text-3xl">Add Product</DialogTitle>
                        <FormAddProduct handleDialogClose={handleDialogClose} />
                    </DialogHeader>
                </DialogContent>
            </Dialog>
            <div className="grid grid-cols-6 gap-3" id="product">
                {product.length > 0 ?
                    product.map((item, index) => (<ProductCardWithToken key={index} data={item} />))
                    :
                    <div className="flex justify-center col-span-6 text-black min-h-96">
                        <b className="text-3xl">No Product</b>
                    </div>
                }
            </div>
        </div>
    )
}

export default MyProduct