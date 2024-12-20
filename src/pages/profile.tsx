import FormProfile from "@/components/profile/form-profile"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useAppSelector } from "@/redux"
import { UserRoundCog } from "lucide-react"
const Profile = () => {
    const { name, email, gender, profile } = useAppSelector(state => state.auth.user)
    return (
        <div className="relative">
            <div className="grid grid-cols-2 p-5">
                <div className="flex flex-col items-center gap-5">
                    <img src={profile?.avatar} className="rounded-full shadow-xl w-28 h-28" alt="" />
                    <b className="text-2xl">{name}</b>
                    <div className="flex">
                        <b>{gender}</b>
                        <span className="px-2">|</span>
                        <b>{email}</b>
                    </div>
                    <p>{profile?.bio}</p>
                </div>
                <img src={profile?.banner} className="rounded-lg" alt="" />
            </div>
            <div className="absolute top-5 right-10">
                <Dialog>
                    <DialogTrigger className="flex items-center justify-center p-3 my-4 bg-white rounded-full shadow-xl"><UserRoundCog /></DialogTrigger>
                    <DialogContent >
                        <DialogHeader>
                            <DialogTitle className="py-6">Edit Profile</DialogTitle>
                            <DialogDescription >
                                <FormProfile />
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}

export default Profile