import { CustomCarousel } from "@/components/ui/CustomCarousel";
import { ProductOrder } from "@/components/products/ProductOrder";
import { ProductDetails } from "@/components/products/ProductDetails";
import { ProductSuggestions } from "@/components/products/ProductSuggesstions";

export default function ProductDetailPage({ params }: { params: { id: string } }) {
    const { id } = params;
    const dummyProduct = {
        id: 1,
        brand: "New Balance",
        name: "2002 men's sneakers shoes - black",
        color: "black",
        currency: "MYR",

        //# formatted
        prices: [
            {
                id: 1,
                productId: 1,
                price: 1000,
                startDate: "2022-01-01",
                endDate: "2022-12-31",
            },
            {
                id: 2,
                productId: 1,
                price: 1200,
                startDate: "2022-01-01",
                endDate: null,
            },
        ],

        sizes: {
            US: [
                { size: 6, quantity: 10 },
                { size: 7, quantity: 8 },
            ],
            EU: [
                { size: 40, quantity: 15 },
                { size: 41, quantity: 10 },
            ],
        },

        //# relation
        categories: [
            {
                id: 1,
                name: "Men's Shoes",
                description: "This is men's shoes category",
            },
        ],

        //# relation
        reviews: [
            {
                id: 1,
                rating: 5,
                comment: "Great product!",
                userId: 1,
                productId: 1,
            },
        ],

        thumbnail: "/imgs/demo-product-2.png",
        images: ["/imgs/demo-product-3.png", "/imgs/demo-product-4.png"],
        description:
            "Our New Balance 2002R sneakers prove that slick kicks can still be comfortable. The suede and mesh upper is inspired by running shoes from the 2000s for a modern take on a throwback aesthetic. The ABZORB midsole and ABZORB SBS heel cushioning deliver limitless comfort while the Stability Web and N-ergy technologies offer arch support and shock absorption to help you go all day.",
    };

    return (
        <div className="lg:px-6">
            <div className="flex gap-5">
                <div className="w-full lg:w-8/12">
                    <CustomCarousel urls={dummyProduct.images} />
                </div>
                <div className="w-full lg:w-4/12">
                    <ProductOrder product={dummyProduct} />
                </div>
            </div>

            <ProductDetails className="mt-8" product={dummyProduct} />

            <ProductSuggestions className="mt-8" />
        </div>
    );
}
