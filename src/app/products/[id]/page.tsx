import { CustomCarousel } from "@/components/ui/CustomCarousel";
import { ProductOrder } from "@/components/products/ProductOrder";
import { ProductDetails } from "@/components/products/ProductDetails";
import { ProductSuggestions } from "@/components/products/ProductSuggesstions";


export default function ProductDetailPage() {
    const imgs = ["/imgs/demo-product-3.png", "/imgs/demo-product-4.png"];

    return (
        <div className="lg:px-6">
            <div className="flex gap-5">
				<div className="w-full lg:w-8/12">
					<CustomCarousel  urls={imgs}/>
				</div>
                <div className="w-full lg:w-4/12">
					<ProductOrder />
				</div>
            </div>

			<ProductDetails  className="mt-8"/>

			<ProductSuggestions  className="mt-8"/>
        </div>
    );
}
