import { Link } from "react-router-dom"

const ExpiredToken = () => {
    return (
        <div className="flex items-center justify-center w-screen h-screen">
            <div className="flex flex-col items-center gap-5">
                <b className="text-6xl">ExpiredToken</b>
                <Link to={"/"} className="text-3xl underline hover:text-blue-400">
                    Go to Home Broooooo Udah Lewat Expired Token
                </Link>
            </div>
        </div>
    )
}

export default ExpiredToken