"use client";

import { useAuth } from "@/context/AuthContext";
import { redirect, useParams } from "next/navigation";
import AuthLoader from "../../components/AuthLoader";
import ForgotPasswordCard from "../../components/ForgotPasswordCard";

const ForgotPasswordClient = () => {
    const { user, isLoading } = useAuth();
    const { pageId: routePage } = useParams();

    if (isLoading) {
        return <AuthLoader />
    }
    if (user && !isLoading) {
        redirect(`/${routePage}`)
    }

    return <ForgotPasswordCard routePage={routePage} />
}

export default ForgotPasswordClient