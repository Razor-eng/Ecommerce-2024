"use client";

import React from 'react'
import SignUpCard from '../../components/SignUpCard';
import { redirect, useParams } from 'next/navigation';
import AuthLoader from '../../components/AuthLoader';
import { useAuth } from '@/context/AuthContext';

const SignUpClient = () => {
    const { user, isLoading } = useAuth();
    const { pageId: routePage } = useParams();

    if (isLoading) {
        return <AuthLoader />
    }
    if (user && !isLoading) {
        redirect(`/${routePage}`)
    }

    return <SignUpCard routePage={routePage} />
}

export default SignUpClient