import { getProduct } from "@/lib/firestore/products/read_server";
import ProductImage from "./_components/ProductImage";
import ProductDetails from "./_components/ProductDetails";
import DottedSeparator from "@/components/DottedSeparator";
import { Separator } from "@/components/ui/separator";
import ProductRelated from "./_components/ProductRelated";
import ProductReview from "./_components/ProductReview";


const ProductPage = async ({ params }) => {
    const { productId } = params;
    const product = await getProduct({ id: productId });

    return (
        <main className="p-2 md:p-10">
            <section className="flex gap-3 flex-col md:flex-row">
                <ProductImage imageList={[product?.featureImageURL, ...(product?.imageList ?? [])]} />
                <DottedSeparator className={"my-4 md:hidden"} />
                <ProductDetails product={product} />
            </section>
            <Separator className="md:my-6 my-3" />
            <ProductReview productId={productId} />
            <ProductRelated categoryId={product?.categoryId} />
            <section></section>
        </main>
    )
}

export default ProductPage