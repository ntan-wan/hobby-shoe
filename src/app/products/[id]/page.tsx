import { CustomCarousel } from "@/components/ui/CustomCarousel";
import { ProductOrder } from "@/components/products/ProductOrder";
import { ProductDetails } from "@/components/products/ProductDetails";
import { ProductSuggestions } from "@/components/products/ProductSuggesstions";

export default function ProductDetailPage() {
    // images: ["/imgs/demo-product-3.png", "/imgs/demo-product-4.png"],
    const data = {
        id: 1,
        brand: "New Balance",
        name: "2002 men's sneakers shoes - black",
        color: "black",
        categories: [
            {
                id: 1,
                name: "Men",
            },
        ],
        sizes: [
            { size: 9, quantity: 10, uom: "US" },
            { size: 10, quantity: 3, uom: "US" },
            { size: 10, quantity: 3, uom: "UK" },
        ],
        currency: "MYR",
        currentPrice: 756,
        prevPrice: 569,
        thumbnail: "/imgs/demo-product-2.png",
        images: ["/imgs/demo-product-3.png", "/imgs/demo-product-4.png"],
        rating: 2,
        description:
            "Our New Balance 2002R sneakers prove that slick kicks can still be comfortable. The suede and mesh upper is inspired by running shoes from the 2000s for a modern take on a throwback aesthetic. The ABZORB midsole and ABZORB SBS heel cushioning deliver limitless comfort while the Stability Web and N-ergy technologies offer arch support and shock absorption to help you go all day.",
    };

    return (
        <div className="lg:px-6">
            <div className="flex gap-5">
                <div className="w-full lg:w-8/12">
                    <CustomCarousel urls={data.images} />
                </div>
                <div className="w-full lg:w-4/12">
                    <ProductOrder product={data} />
                </div>
            </div>

            <ProductDetails className="mt-8" product={data}/>

            <ProductSuggestions className="mt-8" />
        </div>
    );
}
