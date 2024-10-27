"use client";

import Loader from "@/components/Loader";
import { ProductCard } from "@/components/Products";
import { Separator } from "@/components/ui/separator";
import { useAllProducts } from "@/lib/firestore/products/read";
import { useParams } from "next/navigation";

const SearchPage = () => {
    const { searchTerm } = useParams();
    // const { data: products } = useAllProducts();

    // if (!products) {
    //     return (
    //         <Loader />
    //     )
    // }

    return (
        <div className="flex-1 flex flex-col p-2 md:p-5">
            <h2 className="text-xl font-semibold w-fit">Search Results</h2>
            <Separator className={"my-2"} />
            <div className="w-full flex justify-center items-center">
                <h2 className="text-zinc-600 text-2xl border-b-2 border-dashed border-zinc-800">{`${searchTerm}`}</h2>
            </div>
            {/* <SearchResults /> */}
            {/* <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-5">
                {products?.map((product, id) => (
                    <ProductCard key={id} product={product} />
                ))}
            </div> */}
        </div>
    )
}

export default SearchPage