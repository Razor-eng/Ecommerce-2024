import { ProductCard } from "@/components/Products";
import { getCategory } from "@/lib/firestore/categories/read_server";
import { getProductsByCategory } from "@/lib/firestore/products/read_server";

const CategoryPage = async ({ params }) => {
    const { categoryId } = params;
    const [products, category] = await Promise.all([
        getProductsByCategory({ categoryId }),
        getCategory({ id: categoryId }),
    ]);

    return (
        <div className="flex flex-col gap-4 md:gap-10 p-2 md:p-5 flex-1">
            <h2 className="text-2xl md:text-4xl font-semibold text-center">{category?.name}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-5">
                {products?.map((product, id) => (
                    <ProductCard product={product} key={id} />
                ))}
            </div>
        </div>
    )
}

export default CategoryPage