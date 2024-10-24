"use client";

import { useAuth } from "@/context/AuthContext";
import { redirect, useParams } from "next/navigation";
import AuthLoader from "../../components/AuthLoader";
import SignInCard from "../../components/SignInCard";

const SignInClient = () => {
    const { user, isLoading } = useAuth();
    const { pageId: routePage } = useParams();

    if (isLoading) {
        return <AuthLoader />
    }
    if (user && !isLoading) {
        redirect(`/${routePage}`)
    }

    return <SignInCard routePage={routePage} />
}

export default SignInClient