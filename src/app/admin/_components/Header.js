'use client';

import Link from "next/link";
import { UserButton } from "./UserButton";

const Header = () => {
    return (
        <section className="bg-white border-b py-4 hidden lg:flex items-center justify-between px-10">
            <Link href="/dashboard" className="text-white bg-[#659bde] hover:opacity-90 transition rounded-md shadow-md px-10 py-2">
                Store
            </Link>
            <UserButton />
        </section>
    )
}

export default Header