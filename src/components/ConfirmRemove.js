import { Rating } from '@mui/material'
import DottedSeparator from './DottedSeparator'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog'

export const ConfirmRemove = ({
    title = "Are you sure?",
    description = "This will remove the product from the cart.",
    handleClick,
    children,
    product
}) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild className='w-fit'>{children}</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="flex justify-between gap-2 md:gap-5">
                    <div className="size-32">
                        <img src={product?.featureImageURL} alt="" className='h-full w-full object-cover rounded-md' />
                    </div>
                    <div className="flex-1 flex flex-col gap-1">
                        <div className="flex flex-col">
                            <h1 className="font-semibold text-lg line-clamp-2 leading-5">{product?.name}</h1>
                            <Rating size='small' name='product-rating' defaultValue={2.5} precision={0.5} readOnly />
                        </div>
                        <h2 className="text-green-600 font-semibold text-sm">
                            {product?.salePrice} <span className="text-zinc-500 line-through text-xs">{product?.price}</span>
                        </h2>
                        <p className="line-clamp-3 text-zinc-400 text-sm">{product?.description}</p>
                    </div>
                </div>
                <DottedSeparator />
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleClick}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
