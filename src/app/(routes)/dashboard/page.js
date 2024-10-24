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
    <main className="flex flex-col gap-6">
      <FeaturedProductSlider featuredProducts={featuredProducts} />
      <CollectionSlider collections={collections} />
      <CategorySlider categories={categories} />
      <ProductsGridView products={products} />
      <CustomerReview />
      <BrandSlider brands={brands} />
    </main>
  );
}
