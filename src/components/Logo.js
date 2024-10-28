import { cn } from '@/lib/utils'
import Image from 'next/image'

const Logo = ({ isFooter = false }) => {
    return (
        <div className="flex items-center gap-1">
            <Image
                src={'/logo.png'}
                blurDataURL='/logo.png'
                alt='logo'
                width={1000}
                height={1000}
                priority={true}
                className={cn(
                    'w-10',
                    isFooter && "w-7"
                )}
            />
            <h2 className={cn(
                "text-[#58AAAF]",
                isFooter ? "text-xl font-bold" : "sm:text-2xl font-semibold hidden sm:block"
            )}>
                EasyBuyy
            </h2>
        </div>
    )
}

export default Logo