import { API } from "@/lib/api";
import { useAppDispatch } from "@/redux";
import { CHECK_LOGIN } from "@/redux/slice/authSlice";


export const useCheckToken = () => {
    const dispatch = useAppDispatch()
    const checkToken = async (token: string) => {
        try {
            const res = await API.get("user", {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            })
            dispatch(CHECK_LOGIN(res.data));
        } catch (error) {
            console.log(error);
        }
    };

    return {
        checkToken
    }
}