import { CustomCarousel } from "@/components/ui/CustomCarousel";
import { ProductOrder } from "@/components/products/ProductOrder";


export default function ProductDetailPage() {
    const imgs = ["/imgs/demo-product-3.png", "/imgs/demo-product-4.png"];
	// const imgs : string[] = [];

    return (
        <div>
            <div className="flex gap-4">
				<div className="w-full lg:w-8/12">
					<CustomCarousel  urls={imgs}/>
				</div>
                <div className="w-full lg:w-4/12">
					<ProductOrder />
				</div>
            </div>

			<div>test</div>

            <div>related</div>
        </div>
    );
}
