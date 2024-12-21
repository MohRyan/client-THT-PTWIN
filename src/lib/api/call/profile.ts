import { API } from ".."

interface IProfileData {
    avatar: string
    banner: string
    bio: string
}

export const insertProfile = async (data: IProfileData, token: string) => {
    const res = await API.post("profile", data, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
    return res.data
}