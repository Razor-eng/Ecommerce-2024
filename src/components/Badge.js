const Badge = ({ children, value }) => {
    return (
        <div className="relative">
            {children}
            {(value && value > 0) ?
                <span className="absolute top-1 right-0 text-[9px] bg-red-500 text-white font-medium text-center rounded-full px-1 hidden md:block">
                    {value}
                </span>
                :
                null
            }
        </div>
    )
}

export default Badge