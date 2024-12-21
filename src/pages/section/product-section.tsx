import ProductCard from "@/components/product/product-card"
import { getProductAll } from "@/lib/api/call/product"
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
    user?: {
        name: string;
        email: string;
        gender: string;
        profile: {
            avatar: string;
        }
    }
}

const ProductSection = () => {
    const [product, setProduct] = useState<ProductSectionState[]>([])
    const [loading, setLoading] = useState(false)
    const get = async () => {
        setLoading(true)
        try {
            const res = await getProductAll()
            setProduct(res)

        } catch (error) {
            console.log("🚀 ~ get ~ error:", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        get()
    }, [])
    return (
        <>
            {loading ? (<div className="flex justify-center">
                <div className="loader"></div>
            </div>) :
                <section className="grid grid-cols-6 gap-3" id="product">
                    {product!.map((item, index) => (<ProductCard key={index} data={item} />))}
                </section>
            }
        </>
    )
}

export default ProductSection