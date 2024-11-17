import { CustomCarousel } from "@/components/ui/CustomCarousel";
import { ProductOrder } from "@/components/products/ProductOrder";
import { ProductDetails } from "@/components/products/ProductDetails";
import { ProductSuggestions } from "@/components/products/ProductSuggesstions";
import { getProductById } from "@/services/product.service";
import {  withORMWithoutRequest } from "@/lib/mikroORM";
import { LayoutBreadcrumb } from "@/components/layouts/LayoutBreadcrumb";

export default async function ProductDetailPage({ params }: { params: { id: string } }) {

	const {id} = params;
	const product = await withORMWithoutRequest(async () => {
		const data = await getProductById(Number(id));
		return JSON.parse(JSON.stringify(data));
    });
	const links =[{href:`/products/${id}`, label:`${product.name}`}];

    return (
        <div className="c-page lg:px-6">

			<LayoutBreadcrumb className="my-4" links={links}/>

            <div className="flex gap-5">
                <div className="w-full lg:w-8/12">
                    <CustomCarousel urls={product?.images ?? []} />
                </div>
                <div className="w-full lg:w-4/12">
                    <ProductOrder product={product} />
                </div>
            </div>

            <ProductDetails className="mt-8" product={product} />

            <ProductSuggestions className="mt-8" />
        </div>
    );
}
