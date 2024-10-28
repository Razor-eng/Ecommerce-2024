import { ProductCard } from "@/components/Products";
import { getBrand } from "@/lib/firestore/brands/read_server";
import { getProductsByBrand } from "@/lib/firestore/products/read_server";

export default async function BrandPage({ params }) {
    const { brandId } = params;
    const [products, brand] = await Promise.all([
        getProductsByBrand({ brandId: brandId }),
        getBrand({ id: brandId }),
    ]);

    return (
        <div className="flex flex-col gap-4 md:gap-10 p-2 md:p-5 flex-1">
            <h2 className="text-2xl md:text-4xl font-semibold text-center">{brand?.name}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-5">
                {products?.map((product, id) => (
                    <ProductCard product={product} key={id} />
                ))}
            </div>
        </div>
    )
}
