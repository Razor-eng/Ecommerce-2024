import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import Loader from '@/components/Loader'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export const CustomersTable = ({ data }) => {
    console.log(data?.[0])
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">SNo.</TableHead>
                    <TableHead>Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead className="text-center">Total Products</TableHead>
                    <TableHead className="text-center">Total Expense</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data?.map((customer, id) => (
                    <TableRow key={id}>
                        <TableCell className="font-medium">{id + 1}</TableCell>
                        <TableCell>
                            {customer ?
                                <Avatar className="size-11">
                                    <AvatarImage src={customer?.photoURL} alt="avatar" />
                                    <AvatarFallback className="text-lg md:text-xl bg-blue-200 font-semibold">
                                        {customer?.name?.charAt(0).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                :
                                <div className="h-10 w-10 bg-zinc-200 rounded-full p-2">
                                    <Loader />
                                </div>
                            }
                        </TableCell>
                        <TableCell className="whitespace-nowrap">{customer?.name}</TableCell>
                        <TableCell className="whitespace-nowrap">{customer?.email}</TableCell>
                        <TableCell className="text-center">{customer?.products || 0}</TableCell>
                        <TableCell className="text-center text-green-600">₹ {customer?.expense || 0}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}