import { ProductFilter } from "@/components/products/ProductFilter";
import { ProductList } from "@/components/products/ProductList";
import { withORMWithoutRequest } from "@/lib/mikroORM";
import { getProducts } from "@/services/product.service";

export default async function ProductsPage() {
    const productsData = await withORMWithoutRequest(async () => {
        const data = await getProducts();
        const res = JSON.parse(JSON.stringify(data));
        return res;
    });

    return (
        <div className="c-page">
            <div className="flex gap-4">
                <div>
                    <ProductFilter className="sticky top-[var(--navbar-height)]"/>
                </div>
                <div className="w-full pb-12 pt-5">
                    <ProductList products={productsData} />
                </div>
            </div>
        </div>
    );
}
