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
    }, [])

    return (
        <div>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger className="flex items-center justify-center p-3 my-4 bg-white rounded-full shadow-xl"><PackagePlus /></DialogTrigger>
                <DialogContent >
                    <DialogHeader>
                        <DialogTitle className="py-6">Add Product</DialogTitle>
                        <FormAddProduct handleDialogClose={handleDialogClose} />
                    </DialogHeader>
                </DialogContent>
            </Dialog>
            <div className="grid grid-cols-6 gap-3" id="product">
                {product &&
                    product.map((item, index) => (<ProductCardWithToken key={index} data={item} />))
                }
            </div>
        </div>
    )
}

export default MyProduct