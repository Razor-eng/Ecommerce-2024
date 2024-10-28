import DottedSeparator from "@/components/DottedSeparator";
import Loader from "@/components/Loader";
import { ProductCard } from "@/components/Products";
import { getProducts } from "@/lib/firestore/products/read_server";
// import { useParams } from "next/navigation";

const SearchPage = async ({ params }) => {
    const products = await getProducts();

    if (!products) {
        return (
            <Loader />
        )
    }

    const term = params?.searchTerm?.toLowerCase();

    return (
        <div className="flex-1 flex flex-col p-2 md:p-5">
            <h2 className="text-xl font-semibold w-fit">Search Results</h2>
            <DottedSeparator className={"my-2"} />
            <div className="w-full flex justify-center items-center mb-6">
                <h2 className="text-zinc-600 text-2xl border-b-2 border-dashed border-zinc-800">{`${params.searchTerm}`}</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-5">
                {products?.filter((product) => product?.name.toLowerCase()?.includes(term)).map((product, id) => (
                    <ProductCard key={id} product={product} />
                ))}
            </div>
        </div>
    )
}

export default SearchPage