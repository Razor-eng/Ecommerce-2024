import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import Loader from '@/components/Loader'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ViewReviewModal } from './ViewReviewModal'
import { Button } from '@/components/ui/button'
import { Eye } from 'lucide-react'

export const ReviewsTable = ({ data }) => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">SNo.</TableHead>
                    <TableHead>Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead className="text-center">Review</TableHead>
                    <TableHead className="text-center">Rating</TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data?.map((review, id) => (
                    <TableRow key={id}>
                        <TableCell className="font-medium">{id + 1}</TableCell>
                        <TableCell>
                            {review ?
                                <Avatar className="size-11">
                                    <AvatarImage src={review?.photoURL} alt="avatar" />
                                    <AvatarFallback className="text-lg md:text-xl bg-blue-200 font-semibold">
                                        {review?.name?.charAt(0).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                :
                                <div className="h-10 w-10 bg-zinc-200 rounded-full p-2">
                                    <Loader />
                                </div>
                            }
                        </TableCell>
                        <TableCell className="whitespace-nowrap">{review?.name}</TableCell>
                        <TableCell className="truncate max-w-28 md:max-w-48">{review?.review}</TableCell>
                        <TableCell className="text-center">{review?.rating}</TableCell>
                        <TableCell className="text-center">
                            <ViewReviewModal review={review} children={
                                <Button variant="outline" size="sm" disabled={false}>
                                    <Eye />
                                </Button>
                            } />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}