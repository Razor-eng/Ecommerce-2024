import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import { useState } from "react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { createUser } from "@/lib/firestore/user/write"

const SignUpCard = ({ routePage }) => {
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
            const credential = await createUserWithEmailAndPassword(
                auth,
                data?.email,
                data?.password
            );
            const user = credential?.user;
            await updateProfile(user, {
                displayName: data?.name
            });
            await createUser({
                uid: user?.uid,
                user: {
                    uid: user?.uid,
                    name: user?.displayName,
                    email: user?.email
                },
            });

            toast.success("Account Created");
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
        <Card className="max-w-md w-full p-4">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-center">Create Account</CardTitle>
                <CardDescription>Enter the required information to create your account</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="space-y-2 text-lg">
                            <Label htmlFor="name">
                                Name
                            </Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="Enter your full name"
                                value={data?.name ?? ""}
                                onChange={(e) => {
                                    handleData('name', e.target.value);
                                }}
                                disabled={isLoading}
                                required
                            />
                        </div>
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
                                required
                                disabled={isLoading}
                            />
                        </div>
                        <Button disabled={isLoading} type="submit" className="w-full text-[15px]" size="lg">
                            Sign Up
                        </Button>
                        <div className="mt-4 text-center text-sm">
                            Already have an account?
                            <button disabled={isLoading} type="button" onClick={() => router.push(`/${routePage}/sign-in`)} className="ml-2 text-blue-600 hover:text-blue-500 hover:opacity-80 transition">Sign In</button>
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

export default SignUpCard