import { LoaderCircle } from 'lucide-react'
import React from 'react'

const AuthLoader = () => {
    return (
        <div className="h-screen w-screen absolute top-0 left-0 bg-white flex items-center justify-center">
            <LoaderCircle className="text-blue-600 size-7 lg:size-10 animate-spin duration-700" />
        </div>
    )
}

export default AuthLoader