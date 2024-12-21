import { Link } from "react-router-dom"

const Header = () => {
    return (
        <header id="header" className="flex justify-between px-5 py-0.5 bg-gray-200">
            <span>by: Moh Ryan Khalifatul Huda</span>
            <ul className="flex items-center gap-3 text-gray-500">
                <li><Link to={'/'} className="font-bold">Home</Link></li>
                <span className="px-2">|</span>
                <li><b>Contact MyStore</b></li>
                <span className="px-2">|</span>
                <li><b>Promo</b></li>
                <span className="px-2">|</span>
                <li><b>Privacy</b></li>
            </ul>
        </header>
    )
}

export default Header