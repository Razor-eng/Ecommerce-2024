"use client";

import { useAuth } from "@/context/AuthContext";
import Sidebar from "./_components/Sidebar";
import Header from "./_components/Header";
import { redirect } from "next/navigation";
import AuthLoader from "../(auth)/components/AuthLoader";
import { useAdmin } from "@/lib/firestore/admins/read";

const AdminProtectedLayout = ({ children }) => {
    const { user, isLoading } = useAuth();
    const { data, isLoading: isDataLoading } = useAdmin({ email: user?.email });

    if (isLoading || isDataLoading) {
        return <AuthLoader />
    }

    if (!user && !isLoading) {
        redirect("/admin/sign-in");
    }

    if (!data) {
        redirect("/dashboard");
    }

    return (
        <main className="flex h-screen w-screen overflow-x-hidden flex-col md:flex-row">
            <div className="lg:h-screen sticky top-0 z-20">
                <Sidebar />
            </div>
            <section className="flex-1 flex flex-col z-0">
                <Header />
                <section className="flex-1 bg-[#eff3f4]">
                    {children}
                </section>
            </section>
        </main>
    )
}

export default AdminProtectedLayout