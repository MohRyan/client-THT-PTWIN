import { API } from "..";

export const getProductAll = async () => {
    const res = await API.get("product");
    return res.data
}