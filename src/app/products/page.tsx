import { ProductFilter } from "@/components/products/ProductFilter";
import { ProductList } from "@/components/products/ProductList";
import { withORMWithoutRequest } from "@/lib/mikroORM";
import { getAllProductsWithPrices } from "@/services/product.service";

export default async function ProductsPage() {

	const products = await withORMWithoutRequest(async () => {
		const data = await getAllProductsWithPrices();
		const res = JSON.parse(JSON.stringify(data));
		return res;
	})

    return (
        <div>
            <div className="flex gap-4">
                <div>
                    <ProductFilter />
                </div>
                <div className="w-full">
                    <ProductList products={products} />
                </div>
            </div>
        </div>
    );
}
