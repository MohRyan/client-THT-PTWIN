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

const ProfileNav = () => {
    const { name, profile } = useAppSelector(state => state.auth.user)
    const navigate = useNavigate()

    function handleLogout() {
        localStorage.removeItem('token');
        window.location.reload();
        navigate('/')
    }
    return (
        <div className="flex items-center gap-3">
            <b>{name}</b>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <img src={profile?.avatar} className="w-10 h-10 rounded-full" alt="" />
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