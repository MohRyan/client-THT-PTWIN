import FormAddProduct from "@/components/product/form-add-product"
import ProductCardWithToken from "@/components/product/productCardWithToken"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useAppSelector } from "@/redux"
import { PackagePlus } from "lucide-react"

const MyProduct = () => {
    const { product } = useAppSelector(state => state.auth.user)

    return (
        <div>
            <Dialog >
                <DialogTrigger className="flex items-center justify-center p-3 my-4 bg-white rounded-full shadow-xl"><PackagePlus /></DialogTrigger>
                <DialogContent >
                    <DialogHeader>
                        <DialogTitle className="py-6">Add Product</DialogTitle>
                        <DialogDescription >
                            <FormAddProduct />
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
            <div className="grid grid-cols-6 gap-3" id="product">
                {product.map((item, index) => (<ProductCardWithToken key={index} data={item} />))}
            </div>
        </div>
    )
}

export default MyProduct