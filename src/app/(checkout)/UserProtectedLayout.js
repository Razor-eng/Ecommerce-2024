'use client';

import { useAuth } from "@/context/AuthContext";
import { redirect, usePathname } from "next/navigation";
import Header from "../(routes)/dashboard/_components/Header";
import Footer from "../(routes)/dashboard/_components/Footer";
import AuthLoader from "../(auth)/components/AuthLoader";

export const UserProtectedLayout = ({ children }) => {
    const { user, isLoading } = useAuth();
    const pathname = usePathname();

    if (isLoading) {
        return (
            <AuthLoader />
        )
    }

    if (!user && !isLoading) {
        redirect(`${pathname}/sign-in`)
    }

    return (
        <div className="w-screen h-screen flex flex-col overflow-x-hidden">
            <Header />
            <main className="flex-1">
                {children}
            </main>
            <Footer />
        </div>
    )
}