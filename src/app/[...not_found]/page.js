import Link from "next/link"
import { AlertTriangle } from "lucide-react"

export default function ErrorPage() {
    return (
        <div className="flex items-center min-h-screen px-4 py-12 sm:px-6 md:px-8 lg:px-12 xl:px-16">
            <div className="w-full space-y-6 text-center">
                <div className="space-y-3">
                    <div className="flex items-center justify-center">
                        <AlertTriangle color="red" size={52} />
                    </div>
                    <p className="text-gray-500">Sorry, we couldn't find the page you're looking for.</p>
                </div>
                <Link
                    href="/"
                    className="inline-flex h-10 items-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                    prefetch={false}
                >
                    Return to website
                </Link>
            </div>
        </div>
    )
}