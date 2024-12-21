import { useAppSelector } from "@/redux"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Link, useNavigate } from "react-router-dom"

const ProfileNav = ({ setIsToken }: { setIsToken: React.Dispatch<React.SetStateAction<null | string>> }) => {
    const { name, profile, gender } = useAppSelector(state => state.auth.user)
    const navigate = useNavigate()

    function handleLogout() {
        localStorage.removeItem('token');
        navigate('/profile')
        setIsToken(null)
    }
    return (
        <div className="flex items-center gap-3">
            <b>{name}</b>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    {profile?.avatar ? <img src={profile?.avatar} className="w-10 h-10 rounded-full cursor-pointer" alt="" /> : gender === "PRIA" ? <div className="man-pilot"></div> : <div className="woman-pilot"></div>}
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuGroup>
                        <Link to={'/profile'}>
                            <DropdownMenuItem>
                                Profile
                            </DropdownMenuItem>
                        </Link>
                        <Link to={'/my-product'}>
                            <DropdownMenuItem>
                                My Product
                            </DropdownMenuItem>
                        </Link>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleLogout}>
                            <span>Log Out</span>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default ProfileNav