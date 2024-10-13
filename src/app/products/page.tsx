import { ProductFilter } from "@/components/products/ProductFilter";
import { ProductList } from "@/components/products/ProductList";

export default function ProductsPage() {
    return (
        <div>
            <div className="flex gap-4">
                <div>
                    <ProductFilter />
                </div>
                <div className="w-full">
                    <ProductList />
                </div>
            </div>
        </div>
    );
}
