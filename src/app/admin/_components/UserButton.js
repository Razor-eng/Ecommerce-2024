import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/AuthContext";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { Loader, LogOut } from "lucide-react";
import toast from "react-hot-toast";

export function UserButton() {
    const { user } = useAuth();

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

    if (user === undefined) {
        return (
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10">
                    <AvatarFallback>
                        <Loader className="size-6 animate-spin text-muted-foreground" />
                    </AvatarFallback>
                </Avatar>
            </Button>
        )
    }

    const avatarFallback = user ? user?.displayName?.charAt(0).toUpperCase() : user?.email?.charAt(0).toUpperCase();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                        <AvatarImage src={user?.photoURL} alt="User Image" />
                        <AvatarFallback className="text-lg font-semibold bg-zinc-200">
                            {avatarFallback}
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56" forceMount>
                <DropdownMenuLabel className="font-normal flex flex-col gap-3 items-center">
                    <Avatar className="h-14 w-14">
                        <AvatarImage src={user?.photoURL} alt="User Image" />
                        <AvatarFallback className="text-xl font-semibold bg-zinc-200">
                            {avatarFallback}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col space-y-1 items-center justify-center">
                        <p className="font-semibold leading-none">{user?.displayName}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {user?.email}
                        </p>
                    </div>
                    <Separator />
                    <Button onClick={handleLogout} variant="outline" className="w-full">
                        <LogOut className="size-5 mr-2" />
                        Log out
                    </Button>
                </DropdownMenuLabel>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
