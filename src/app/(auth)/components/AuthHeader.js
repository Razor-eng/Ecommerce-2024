"use client"

import { Button } from "@/components/ui/button"
import { useParams, usePathname, useRouter } from "next/navigation"
import Logo from "@/components/Logo";
import { useAuth } from "@/context/AuthContext";
import AuthLoader from "./AuthLoader";
import Link from "next/link";

export default function AuthHeader() {
    const pathname = usePathname();
    const params = useParams();
    const router = useRouter();
    const { user, isLoading } = useAuth();

    const path = params.productId ? `${params.pageId}/${params.productId}` : `${params.pageId}`;

    if (!user && !isLoading) {
        return (
            <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6 border-b">
                <Link href={"/dashboard"}>
                    <Logo />
                </Link>
                <div className="ml-auto hidden lg:flex gap-2">
                    <Button variant="outline" onClick={() => router.push(`/${path}/sign-in`)}>
                        Sign In
                    </Button>
                    <Button onClick={() => router.push(`/${path}/sign-up`)}>
                        Sign Up
                    </Button>
                </div>
                <div className="ml-auto flex lg:hidden gap-2">
                    {pathname.includes("/sign-in") ?
                        <Button size="lg" className="text-lg font-semibold" onClick={() => router.push(`/${path}/sign-up`)}>
                            Sign Up
                        </Button>
                        :
                        <Button variant="outline" size="lg" className="text-lg font-semibold" onClick={() => router.push(`/${path}/sign-in`)}>
                            Sign In
                        </Button>
                    }
                </div>
            </header>
        )
    }

    return <AuthLoader />
}