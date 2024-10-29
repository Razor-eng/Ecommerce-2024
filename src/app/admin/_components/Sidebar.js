"use client";

import { Cat, Layers2, LayoutDashboard, LibraryBig, LogOut, PackageOpen, ShieldCheck, ShoppingCart, Star, Users } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import Logo from "@/components/Logo";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function Sidebar() {
    const pathname = usePathname();
    const SidebarItems = [
        { title: "Dashboard", link: "/admin", Icon: LayoutDashboard },
        { title: "Products", link: "/admin/products", Icon: PackageOpen },
        { title: "Categories", link: "/admin/categories", Icon: Layers2 },
        { title: "Brands", link: "/admin/brands", Icon: Cat },
        { title: "Orders", link: "/admin/orders", Icon: ShoppingCart },
        { title: "Customers", link: "/admin/customers", Icon: Users },
        { title: "Reviews", link: "/admin/reviews", Icon: Star },
        { title: "Collections", link: "/admin/collections", Icon: LibraryBig },
        { title: "Admins", link: "/admin/admins", Icon: ShieldCheck },
    ]

    const handleLogout = async () => {
        try {
            await toast.promise(signOut(auth), {
                error: (e) => e?.message,
                loading: "Logging Out...",
                success: "Logged Out!"
            });
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <div className="flex lg:h-full">
            <div className="hidden lg:block lg:w-64 lg:shrink-0 lg:border-r lg:bg-white dark:lg:bg-gray-800">
                <div className="flex h-full flex-col justify-between py-6 px-4">
                    <div className="space-y-6">
                        <div className="flex justify-center">
                            <Logo />
                        </div>
                        <ul className="flex-1 flex flex-col gap-3 py-6">
                            {SidebarItems.map((item, id) => {
                                const isActive = pathname === item.link;
                                return (
                                    <Link href={item.link} key={id}>
                                        <li className={cn(
                                            "flex items-center gap-2 px-10 py-3 rounded-lg font-semibold text-zinc-500 hover:bg-zinc-200 dark:hover:bg-gray-600 dark:hover:text-gray-400 transition",
                                            isActive && "bg-zinc-300 dark:bg-gray-700 dark:text-white font-semibold text-zinc-900 hover:text-zinc-900 dark:hover:text-white"
                                        )}
                                        >
                                            <item.Icon className="h-5 w-5" /> {item.title}
                                        </li>
                                    </Link>
                                )
                            })}
                        </ul>
                    </div>
                    <div className="flex">
                        <button onClick={handleLogout} className="w-full text-lg font-semibold flex items-center justify-center gap-1 hover:bg-zinc-200 text-zinc-600 hover:text-zinc-900 transition py-2 rounded-lg border">
                            <LogOut className="size-5 mr-2" /> Logout
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex-1">
                <header className="sticky top-0 z-10 border-b shadow-sm bg-white p-4 dark:border-gray-800 dark:bg-gray-900 lg:hidden">
                    <div className="flex items-center justify-between">
                        <Link href="/admin" className="flex items-center" prefetch={false}>
                            <Logo />
                        </Link>
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="outline" size="icon">
                                    <MenuIcon className="h-6 w-6" />
                                    <span className="sr-only">Toggle navigation</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-64 overflow-y-scroll">
                                <SheetHeader className="hidden">
                                    <SheetTitle>Sidebar</SheetTitle>
                                    <SheetDescription>This is description</SheetDescription>
                                </SheetHeader>
                                <div className="flex h-full flex-col justify-between py-6">
                                    <div className="space-y-6">
                                        <ul className="flex flex-col items-start gap-3 py-6">
                                            {SidebarItems.map((item, id) => {
                                                const isActive = pathname === item.link;
                                                return (
                                                    <Link
                                                        key={id}
                                                        href={item.link}
                                                        className={cn(
                                                            "flex items-center justify-start gap-2 w-full py-3 rounded-lg font-semibold text-lg text-zinc-500 hover:bg-zinc-200 transition pl-7",
                                                            isActive && "bg-zinc-300 font-semibold text-zinc-900 hover:bg-zinc-300"
                                                        )}
                                                    >
                                                        <item.Icon className="h-5 w-5" /> {item.title}
                                                    </Link>
                                                )
                                            })}
                                        </ul>
                                    </div>
                                    <div className="md:hidden">
                                        <Link href={'/dashboard'}>
                                            <Button className="w-full text-lg" size="lg">
                                                Store
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </header>
            </div>
        </div >
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
