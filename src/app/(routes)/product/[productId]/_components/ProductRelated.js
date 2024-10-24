import { ProductCard } from '@/components/Products';
import { getProductsByCategory } from '@/lib/firestore/products/read_server'

export default async function ProductRelated({ categoryId }) {
    const products = await getProductsByCategory({ categoryId });
    return (
        <div className="flex flex-col gap-4 p-2 md:p-5">
            <h2 className="text-2xl font-semibold text-center">Related Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-5">
                {products?.map((product, id) => id < 4 && (
                    <ProductCard product={product} key={id} />
                ))}
            </div>
        </div>
    )
}
