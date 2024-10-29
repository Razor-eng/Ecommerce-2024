import { ComputerIcon, MoonIcon, SunIcon } from "lucide-react";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export default function ThemeSwitcher() {
    const { setTheme, theme } = useTheme();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="rounded-full dark:hover:bg-gray-700">
                    <SunIcon className="h-5 w-5 text-gray-500 dark:text-gray-400 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <MoonIcon className="absolute h-5 w-5 text-gray-500 dark:text-gray-400 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")} className={cn(
                    "border-b pl-3 cursor-pointer",
                    theme === "light" && "bg-gray-300"
                )}>
                    <SunIcon /> Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")} className={cn(
                    "border-b pl-3 cursor-pointer",
                    theme === "dark" && "bg-gray-700"
                )}>
                    <MoonIcon /> Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")} className={cn(
                    "pl-3 cursor-pointer",
                    theme === "system" && "bg-gray-300"
                )}>
                    <ComputerIcon /> System
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
