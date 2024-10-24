import { LoaderCircle } from 'lucide-react'

const Loader = () => {
    return (
        <div className="h-full w-full flex items-center justify-center">
            <LoaderCircle className="text-blue-600 size-7 lg:size-10 animate-spin duration-700" />
        </div>
    )
}

export default Loader