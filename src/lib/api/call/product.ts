import { API } from "..";

export const getProductAll = async () => {
    const res = await API.get("product");
    return res.data
}

export const getProductByToken = async (id: string) => {
    const res = await API.get(`product/${id}`);
    return res.data
}