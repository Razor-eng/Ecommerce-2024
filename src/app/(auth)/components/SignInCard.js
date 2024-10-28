import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import toast from "react-hot-toast";
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useState } from "react";
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/firestore/user/write"

const SignInCard = ({ routePage }) => {
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
            await signInWithEmailAndPassword(
                auth,
                data?.email,
                data?.password
            );

            toast.success("Signed in");
            setData(null);
        } catch (error) {
            toast.error(error?.message);
        } finally {
            setIsLoading(false);
        }
    }

    const SignInWithGoogle = async () => {
        setIsLoading(true);
        try {
            const credential = await signInWithPopup(auth, new GoogleAuthProvider());
            const user = credential?.user;
            await createUser({
                uid: user?.uid,
                user: {
                    uid: user?.uid,
                    name: user?.displayName,
                    email: user?.email,
                    photoURL: user?.photoURL
                },
            });
            toast.success("Logged In")
        } catch (error) {
            toast.error(error?.message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Card className="max-w-md w-full p-4 py-6 h-full md:h-auto">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-center">Sign In</CardTitle>
                <CardDescription>Enter your email and password to login to your account</CardDescription>
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
                        <div className="flex flex-col gap-2">
                            <div className="space-y-2 text-lg">
                                <Label htmlFor="password">
                                    Password
                                </Label>
                                <Input
                                    id="password"
                                    placeholder="Enter your password"
                                    type="password"
                                    value={data?.password ?? ""}
                                    onChange={(e) => {
                                        handleData('password', e.target.value);
                                    }}
                                    disabled={isLoading}
                                    required
                                />
                            </div>
                            <div className="w-full flex justify-end mb-2">
                                <div onClick={() => router.push(`/${routePage}/forget-password`)}>
                                    <p className="text-[13px] font-semibold hover:underline transition-all ease-in duration-150 text-blue-600 cursor-pointer hover:opacity-80">Forgot Password?</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <Button disabled={isLoading} type="submit" className="w-full text-[15px]" size="lg">
                                Login
                            </Button>
                            <div className="mt-4 text-center text-sm">
                                Create an account?
                                <button disabled={isLoading} type="button" onClick={() => router.push(`/${routePage}/sign-up`)} className="ml-2 text-blue-600 hover:text-blue-500 hover:opacity-80 transition">Sign Up</button>
                            </div>
                        </div>
                    </form>
                    <Separator />
                    <Button disabled={isLoading} onClick={SignInWithGoogle} variant="teritary" className="w-full text-[15px] flex items-center gap-4" size="lg">
                        <Image
                            priority={true}
                            src="/google.png" alt="google logo" height={100} width={100} className="w-6" />
                        Sign In with Google
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default SignInCard