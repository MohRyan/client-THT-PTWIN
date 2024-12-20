import { API } from "..";

export interface IProductData {
    name_product?: string
    img_product?: string
    price?: string
    rating?: string
    description?: string
    diskon?: string
}

export const getProductAll = async () => {
    const res = await API.get("product");
    return res.data
}

export const getProductByToken = async (id: string) => {
    const res = await API.get(`product/${id}`);
    return res.data
}

export const deleteProduct = async (productId: string, token: string) => {
    const res = await API.delete(`product/${productId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    return res.data
}

export const updateProduct = async (productId: string, data: IProductData, token: string) => {
    const res = await API.put(`product/${productId}`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    return res.data
}