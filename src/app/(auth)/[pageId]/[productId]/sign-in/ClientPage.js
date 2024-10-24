"use client";

import AuthLoader from "@/app/(auth)/components/AuthLoader";
import SignInCard from "@/app/(auth)/components/SignInCard";
import { useAuth } from "@/context/AuthContext";
import { redirect, useParams } from "next/navigation";

const SignInClient = () => {
    const { user, isLoading } = useAuth();
    const { pageId, productId } = useParams();

    const routePage = `${pageId}/${productId}`;

    if (isLoading) {
        return <AuthLoader />
    }
    if (user && !isLoading) {
        redirect(`/${routePage}`)
    }

    return <SignInCard routePage={routePage} />
}

export default SignInClient