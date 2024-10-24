"use client";

import Link from "next/link"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Toggle } from "@/components/ui/toggle"
import { Sheet, SheetTrigger, SheetContent, SheetTitle, SheetHeader, SheetDescription } from "@/components/ui/sheet"
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Logo from "@/components/Logo";
import { Contact, FolderHeart, Heart, Home, ShoppingBag, ShoppingCart, Store } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { UserButton } from "@/app/admin/_components/UserButton";
import { useUser } from "@/lib/firestore/user/read";
import Badge from "@/components/Badge";
import { useAdmin } from "@/lib/firestore/admins/read";

export default function Header() {
    const { user, isLoading } = useAuth();
    const { data: isAdmin } = useAdmin({ email: user?.email });
    const { data } = useUser({ uid: user?.uid });
    const HeaderItems = [
        { title: "Home", href: "/dashboard", icon: <Home /> },
        // { title: "About", href: "/about", icon: <Store /> },
        // { title: "Contact", href: "/contact", icon: <Contact /> },
        { title: "Favorites", href: "/favorites", icon: <FolderHeart /> },
        { title: "Cart", href: "/cart", icon: <ShoppingBag /> },
    ]
    const pathname = usePathname();

    return (
        <header className="w-full border-b bg-white dark:border-gray-800 dark:bg-gray-950 z-40 sticky top-0 shadow-sm">
            <div className="flex h-20 items-center justify-between px-4 md:px-6">
                <div className="flex items-center gap-3">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="rounded-full md:hidden">
                                <MenuIcon className="h-7 w-7 text-gray-500 dark:text-gray-400" />
                                <span className="sr-only">Toggle navigation menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="md:hidden">
                            <SheetHeader className={"hidden"}>
                                <SheetTitle>Navbar</SheetTitle>
                                <SheetDescription>Navbar</SheetDescription>
                            </SheetHeader>
                            <div className="flex flex-col h-full justify-between my-8">
                                <div className="flex flex-col gap-4 flex-1">
                                    {HeaderItems.map((item, id) => {
                                        const isActive = pathname === item.href;
                                        return (
                                            <Button key={id} asChild variant={cn(isActive ? "secondary" : "ghost")} size="lg" className="text-xl font-medium w-full flex justify-start">
                                                <Link
                                                    href={item.href}
                                                    className="text-gray-500 hover:text-gray-900 px-2 text-[15px] dark:text-gray-400 dark:hover:text-gray-50 flex gap-3"
                                                    prefetch={false}
                                                >
                                                    {item.icon}
                                                    {item.title}
                                                </Link>
                                            </Button>
                                        )
                                    })}
                                </div>
                                <div className="md:hidden mb-8">
                                    {isAdmin ?
                                        <Link href={'/admin'}>
                                            <Button className="w-full text-lg" size="lg">
                                                Admin
                                            </Button>
                                        </Link>
                                        :
                                        null
                                    }
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                    <Link href="/dashboard" className="flex items-center gap-2" prefetch={false}>
                        <Logo />
                    </Link>
                </div>
                {/* <nav className="hidden items-center gap-4 text-sm font-medium md:flex">
                    {HeaderItems.map((item, id) => {
                        const isActive = pathname === item.href;
                        if (id < 3) {
                            return (
                                <Button key={id} asChild variant={cn(isActive ? "secondary" : "ghost")} className="text-base px-7">
                                    <Link
                                        href={item.href}
                                        className="text-gray-500 hover:text-gray-900 px-2 text-[15px] dark:text-gray-400 dark:hover:text-gray-50"
                                        prefetch={false}
                                    >
                                        {item.title}
                                    </Link>
                                </Button>
                            )
                        } else {
                            return null;
                        }
                    })}
                </nav> */}
                <div className="flex items-center gap-1 md:gap-2">
                    <div className="hidden md:block">
                        {isAdmin ?
                            <div className="mr-3">
                                <Link href={'/admin'}>
                                    <Button className="w-28">
                                        Admin
                                    </Button>
                                </Link>
                            </div>
                            :
                            null
                        }
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="secondary" className="md:hidden">
                                <SearchIcon className="size-5 text-gray-500 dark:text-gray-400" />
                                <span className="sr-only">Search</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-[300px] p-4">
                            <div className="relative">
                                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                                <Input type="search" placeholder="Search..." className="pl-8 w-full" />
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="hidden md:block rounded-full">
                                <SearchIcon className="size-5 text-gray-500 dark:text-gray-400" />
                                <span className="sr-only">Search</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-[300px] p-4">
                            <div className="relative">
                                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                                <Input type="search" placeholder="Search..." className="pl-8 w-full" />
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Link href={'/favorites'}>
                        <Badge value={data?.favorites?.length}>
                            <Button variant="ghost" className="rounded-full hidden md:block">
                                <Heart className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                            </Button>
                        </Badge>
                    </Link>
                    <Link href={'/cart'}>
                        <Badge value={data?.cart?.length}>
                            <Button variant="ghost" className="rounded-full hidden md:block">
                                <ShoppingCart className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                            </Button>
                        </Badge>
                    </Link>
                    <Toggle aria-label="Toggle dark mode" className="rounded-full hidden md:block">
                        <MoonIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    </Toggle>
                    {user || isLoading ?
                        <UserButton />
                        :
                        <Button
                            size="lg"
                            variant="outline"
                            asChild
                        >
                            <Link href={`${pathname}/sign-in`}>
                                Sign In
                            </Link>
                        </Button>
                    }
                </div>
            </div>
        </header>
    )
}

function MenuIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
        </svg>
    )
}


function MoonIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
    )
}

function SearchIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
        </svg>
    )
}