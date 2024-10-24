"use client";

import { redirect, useParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import AuthLoader from '@/app/(auth)/components/AuthLoader';
import SignUpCard from '@/app/(auth)/components/SignUpCard';

const SignUpClient = () => {
    const { user, isLoading } = useAuth();
    const { pageId, productId } = useParams();

    const routePage = `${pageId}/${productId}`;

    if (isLoading) {
        return <AuthLoader />
    }
    if (user && !isLoading) {
        redirect(`/${routePage}`)
    }

    return <SignUpCard routePage={routePage} />
}

export default SignUpClient