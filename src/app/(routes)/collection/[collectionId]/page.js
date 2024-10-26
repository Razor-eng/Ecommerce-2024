import { ProductCard } from "@/components/Products";
import { getCollection } from "@/lib/firestore/collections/read_server";
import { getProduct } from "@/lib/firestore/products/read_server";
import Image from "next/image";

const CollectionPage = async ({ params }) => {
    const { collectionId } = params;
    const collection = await getCollection({ id: collectionId });

    return (
        <div className="flex flex-col gap-4 md:gap-10 p-2 md:p-5">
            <div className="flex flex-col">
                <div className="w-full flex justify-center">
                    <Image
                        src={collection?.imageURL}
                        alt="collection"
                        className="h-[110px]"
                        blurDataURL={collection?.imageURL}
                        height={1000}
                        width={1000}
                        priority={true}
                    />
                </div>
                <h2 className="text-2xl md:text-4xl font-semibold text-center">{collection?.name}</h2>
                <h2 className="text-center text-zinc-500">{collection?.subTitle}</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-5">
                {collection?.products?.map((productId, id) => (
                    <Product productId={productId} key={id} />
                ))}
            </div>
        </div>
    )
}

export default CollectionPage

async function Product({ productId }) {
    const product = await getProduct({ id: productId });
    return (
        <ProductCard product={product} />
    )
}