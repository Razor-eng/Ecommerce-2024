import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import toast from "react-hot-toast";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useState } from "react";
import { useRouter } from "next/navigation"

const ForgotPasswordCard = ({ routePage }) => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const [data, setData] = useState(null);

    const handleData = (key, value) => {
        setData({
            ...data,
            [key]: value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await sendPasswordResetEmail(
                auth,
                data?.email
            );
            toast.success("Reset Link Sent!");
            setData(null);
            router.push(`/${routePage}/sign-in`);
        } catch (error) {
            toast.error(error?.message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Card className="max-w-md w-full p-4 py-6">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-center">Reset Password</CardTitle>
                <CardDescription className="text-center">Enter your email to receive a password rest link.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="space-y-2 text-lg">
                            <Label htmlFor="email">
                                Email
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                value={data?.email ?? ""}
                                onChange={(e) => {
                                    handleData('email', e.target.value);
                                }}
                                disabled={isLoading}
                                required
                            />
                        </div>
                        <Button disabled={isLoading} type="submit" className="w-full text-[15px]" size="lg">
                            Send Reset Link
                        </Button>
                        <div className="pt-6 flex items-center gap-4">
                            <Button type="button" onClick={() => router.push(`/${routePage}/sign-in`)} variant="secondary" className="w-full">
                                Sign In
                            </Button>
                            <Button type="button" onClick={() => router.push(`/${routePage}/sign-up`)} variant="teritary" className="w-full">
                                Sign Up
                            </Button>
                        </div>
                    </form>
                </div>
            </CardContent>
        </Card>
    )
}

export default ForgotPasswordCard