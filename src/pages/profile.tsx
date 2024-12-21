import ProductCardWithToken from "@/components/product/productCardWithToken"
import FormProfile from "@/components/profile/form-profile"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useAppSelector } from "@/redux"
import { UserRoundCog } from "lucide-react"
import { useState } from "react"
const Profile = () => {
    const { name, email, gender, profile, product } = useAppSelector(state => state.auth.user)
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const handleDialogClose = () => setIsOpen(false);
    return (
        <div className="relative">
            <div className="grid grid-cols-2 p-5">
                <div className="flex flex-col items-center gap-5">
                    {profile !== null ?
                        <img src={profile?.avatar} className="rounded-full shadow-xl w-28 h-28" alt="" />
                        :
                        gender === "PRIA" ? <div className="scale-150 man-pilot"></div> : <div className="scale-150 woman-pilot"></div>
                    }
                    <b className="text-2xl">{name}</b>
                    <div className="flex">
                        <b>{gender}</b>
                        <span className="px-2">|</span>
                        <b>{email}</b>
                    </div>
                    <p>{profile?.bio}</p>
                </div>
                <div className="flex w-full h-[300px] rounded-3xl justify-center ">
                    {profile !== null ?
                        <img src={profile?.banner} className="rounded-lg" alt="" />
                        :
                        gender === "PRIA" ?
                            <img src="https://img.freepik.com/premium-vector/woman-airplane-pilot-flat-color-detailed-character-gender-balance-workplace-female-working-airline-industry-isolated-cartoon-illustration-web-graphic-design-animation_151150-2867.jpg"></img> :
                            <img className="object-contain w-full h-full" src="https://img.freepik.com/premium-vector/smiling-young-woman-pilot-captain-passenger-plane_723224-2847.jpg?semt=ais_hybrid"></img>
                    }
                </div>
            </div>
            <div className="absolute top-5 right-10">
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger className="flex items-center justify-center p-3 my-4 bg-white rounded-full shadow-xl"><UserRoundCog /></DialogTrigger>
                    <DialogContent >
                        <DialogHeader>
                            <DialogTitle className="py-6 text-3xl">Edit Profile</DialogTitle>
                            <FormProfile handleDialogClose={handleDialogClose} profile={profile!} />
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>
            <div className="flex flex-col gap-5">
                <b className="text-3xl">My Product</b>
                <div className="grid grid-cols-6 gap-3" id="product">
                    {product!.map((item, index) => (<ProductCardWithToken key={index} data={item} />))}
                </div>
            </div>
        </div>
    )
}

export default Profile