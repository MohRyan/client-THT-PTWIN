import React from 'react'
import { Input } from './ui/input'
import { Eye, EyeOff } from 'lucide-react'
import { ControllerRenderProps } from 'react-hook-form';

interface InputPasswordProps {
    field: ControllerRenderProps<{ name: string; confirmPassword: string; email: string; password: string; }, "confirmPassword" | "password"> | ControllerRenderProps<{ email: string; password: string; }, "password">
    placeholder: string
}

const InputPassword = ({ field, placeholder }: InputPasswordProps) => {
    const [togleEye, setTogglEye] = React.useState<boolean>(false)
    return (
        <div className="relative">
            <Input type={togleEye ? "text" : "password"} placeholder={placeholder} {...field} />
            {togleEye ?
                <Eye onClick={() => setTogglEye(false)} className="absolute top-2 right-3" />
                :
                <EyeOff onClick={() => setTogglEye(true)} className="absolute top-2 right-3" />
            }
        </div>
    )
}

export default InputPassword