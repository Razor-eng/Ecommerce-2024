import { getFeaturedProducts, getProducts } from "@/lib/firestore/products/read_server";
import FeaturedProductSlider from "./_components/Slider";
import CollectionSlider from "./_components/CollectionSlider";
import { getCollections } from "@/lib/firestore/collections/read_server";
import CategorySlider from "./_components/CategorySlider";
import { getCategories } from "@/lib/firestore/categories/read_server";
import { ProductsGridView } from "@/components/Products";
import CustomerReview from "./_components/CustomerReview";
import BrandSlider from "./_components/BrandSlider";
import { getBrands } from "@/lib/firestore/brands/read_server";
import DottedSeparator from "@/components/DottedSeparator";

export default async function Home() {
  const [
    featuredProducts,
    collections,
    categories,
    products,
    brands,
  ] = await Promise.all([
    getFeaturedProducts(),
    getCollections(),
    getCategories(),
    getProducts(),
    getBrands(),
  ]);

  return (
    <main className="flex flex-col gap-4 flex-1">
      <FeaturedProductSlider featuredProducts={JSON.parse(JSON.stringify(featuredProducts))} />
      <CollectionSlider collections={JSON.parse(JSON.stringify(collections))} />
      <DottedSeparator />
      <CategorySlider categories={JSON.parse(JSON.stringify(categories))} />
      <DottedSeparator />
      <ProductsGridView products={JSON.parse(JSON.stringify(products))} />
      <DottedSeparator />
      {/* <CustomerReview /> */}
      <BrandSlider brands={JSON.parse(JSON.stringify(brands))} />
    </main>
  );
}
