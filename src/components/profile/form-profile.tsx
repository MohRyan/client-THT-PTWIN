import { ImagePlus } from "lucide-react"
import { Textarea } from "../ui/textarea"
import { Button } from "../ui/button"
import React from "react";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUploadImage } from "@/lib/hooks/useUploadImageSupabase";
import { insertProfile } from "@/lib/api/call/profile";
import { useCheckToken } from "@/lib/hooks/useCheckToken";
import toast from "react-hot-toast";
import { IProfile } from "@/redux/types/state";

export const formSchema = z.object({
    bio: z.string().min(10).max(500),
})

const FormProfile = ({ handleDialogClose, profile }: { handleDialogClose: () => void, profile: IProfile }) => {
    const [selectedAvatar, setSelectedAvatar] = React.useState<File | null>(null);
    const [selectedBanner, setSelectedBanner] = React.useState<File | null>(null);

    const [renderedAvatar, setRenderedAvatar] = React.useState<string | null>(profile.avatar || null);
    const [renderedBanner, setRenderedBanner] = React.useState<string | null>(profile.banner || null);
    const [loading, setLoading] = React.useState<boolean>(false)
    const token = localStorage.getItem('token')
    const { checkToken } = useCheckToken()

    React.useEffect(() => {
        if (!selectedAvatar) return
        const reader = new FileReader()
        reader.onload = (e) => setRenderedAvatar(e.target?.result as string)
        reader.readAsDataURL(selectedAvatar)
    }, [selectedAvatar])

    React.useEffect(() => {
        if (!selectedBanner) return
        const reader = new FileReader()
        reader.onload = (e) => setRenderedBanner(e.target?.result as string)
        reader.readAsDataURL(selectedBanner)
    }, [selectedBanner])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            bio: profile.bio || "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true)
        let avatar = ""
        if (selectedAvatar !== null) {
            const resAvatar = await useUploadImage(selectedAvatar!)
            avatar = resAvatar!
        }
        let banner = ""
        if (selectedBanner !== null) {
            const resBanner = await useUploadImage(selectedBanner!)
            banner = resBanner!
        }

        const addProfile = {
            avatar: avatar,
            banner: banner,
            bio: values.bio,
        }
        try {
            await insertProfile(addProfile, token!)
            checkToken(token!)
            toast.success('Create Profile Success')
            handleDialogClose()
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-3 gap-8">
                <label htmlFor="avatar" className="flex items-center justify-center col-span-1 row-span-2 bg-center bg-cover border border-gray-300 rounded-full max-w-44 min-h-44" style={{ backgroundImage: `url('${renderedAvatar}')` }}>
                    {!renderedAvatar &&
                        <ImagePlus size={40} />
                    }
                    <input onChange={(e) => setSelectedAvatar(e.target.files![0])} type="file" id="avatar" className="hidden" />
                </label>
                <label htmlFor="banner" className="flex items-center justify-center max-w-full col-span-2 row-span-2 bg-center bg-cover border border-gray-300 rounded-2xl min-h-44" style={{ backgroundImage: `url('${renderedBanner}')` }}>
                    {!renderedBanner &&
                        <ImagePlus size={40} />
                    }
                    <input onChange={(e) => setSelectedBanner(e.target.files![0])} type="file" id="banner" className="hidden" />
                </label>
                <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                        <FormItem className="col-span-3">
                            <FormLabel>Bio</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Tell us a little bit about yourself"
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={loading}>
                    {loading ? 'Loading...' : 'Submit'}
                </Button>
            </form>
        </Form>
    )
}

export default FormProfile