import { ProductSectionState } from "@/pages/section/product-section"
import StarRating from "../start-rating"

interface IProductCard {
    data: ProductSectionState
}

const ProductCard = ({ data }: IProductCard) => {
    const priceDiskon = data.price - (data.price * data.diskon! / 100)
    return (
        <div className="flex flex-col justify-between col-span-6 p-4 border border-gray-300 rounded-lg md:col-span-2 lg:col-span-1">
            <div className="flex relative h-[50%] w-[100%] min-h-52 rounded-t-lg bg-cover" style={{ backgroundImage: `url('${data.img_product}')` }}>
                {data.diskon &&
                    <div className="z-0 w-full text-black bg-red-400 card-product-clip">
                        <b className="absolute z-20 text-white -rotate-45 top-1.5 left-0.5">20%</b>
                    </div>
                }
                <div className="absolute w-10 h-10 bg-cover rounded-full shadow-md -top-5 -right-7" style={{ backgroundImage: `url('${data.user.profile.avatar}')` }}>

                </div>
            </div>
            <div className="flex flex-col gap-4 mt-2">
                <b className="line-clamp-2">{data.name_product}</b>
                {data.diskon === null ?
                    <span className="text-2xl ">Rp. {Number(data.price).toLocaleString('id-ID')}</span>
                    :
                    <div className="flex flex-col justify-between">
                        <span className="text-lg text-gray-400 line-through">Rp. {data.price}</span>
                        <span className="text-2xl ">Rp. {priceDiskon}</span>
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

export default ProductCard