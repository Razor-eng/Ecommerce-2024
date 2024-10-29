import DottedSeparator from '@/components/DottedSeparator'
import Logo from '@/components/Logo'
import { Mail, MapPin, Phone } from 'lucide-react'
import React from 'react'

const Footer = () => {
    return (
        <footer className='flex flex-col gap-3 w-full bg-blue-50 dark:bg-zinc-950 border-t p-2 md:px-10 md:pt-7 md:pb-3'>
            <div className="w-full flex flex-col md:flex-row md:justify-between gap-3">
                <Logo isFooter />
                <div className="flex-1 flex flex-col md:flex-row justify-end gap-4">
                    <div className="flex gap-2 items-center">
                        <Phone size={12} className='text-blue-500' />
                        <h2 className="text-sm text-zinc-500">+91 9861711134</h2>
                    </div>
                    <div className="flex gap-2 items-center">
                        <Mail size={12} className='text-blue-500' />
                        <h2 className="text-sm text-zinc-500">mrajat00@gmail.com</h2>
                    </div>
                    <div className="flex gap-2 items-center">
                        <MapPin size={12} className='text-blue-500' />
                        <h2 className="text-sm text-zinc-500">Parlakhemundi, Odisha</h2>
                    </div>
                </div>
            </div>
            <DottedSeparator />
            <div className="flex justify-center w-full">
                <h3 className="text-sm text-gray-600">
                    © {new Date().getFullYear()}. All rights reserved by Rajat Kumar Maharana
                </h3>
            </div>
        </footer>
    )
}

export default Footer