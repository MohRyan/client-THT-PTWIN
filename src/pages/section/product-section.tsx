import ProductCard from "@/components/product/product-card"
import { getProductAll } from "@/lib/api/call/product"
import { IProduct } from "@/redux/types/state"
import { useEffect, useState } from "react"

export interface ProductSectionState {
    id: string;
    userId: string;
    name_product: string;
    img_product: string;
    price: number;
    rating: number;
    description: string;
    sku: string;
    diskon?: number;
    user: {
        name: string;
        email: string;
        profile: {
            avatar: string;
        }
    }
}

const ProductSection = () => {
    const [product, setProduct] = useState<ProductSectionState[]>([])
    const get = async () => {
        const res = await getProductAll()
        console.log("🚀 ~ get ~ res:", res)
        setProduct(res)
    }

    useEffect(() => {
        get()
    }, [])
    return (
        <section className="grid grid-cols-6 gap-3" id="product">
            {product!.map((item, index) => (<ProductCard key={index} data={item} />))}
        </section>
    )
}

export default ProductSection