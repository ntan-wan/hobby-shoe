import { CartTable } from "@/components/cart/CartTable";
import { CartSummary } from "@/components/cart/CartSummary";
import { ProductSuggestions } from "@/components/products/ProductSuggesstions";


export default async function CartPage() {

    const cartItems = [{
        id: 1,
        cartId: 1,
        productId: 1,
		
		//# relation
        product: {
            id: 1,
            brand: "New Balance",
            name: "2002 men's sneakers shoes - black",
            color: "black",
            currency: "MYR",
            prices: {
                current: 756,
                previous: 569,
            },
            categoryId: 1,
			size: {
				value: 6,
				uom: 'US'
			},
            thumbnail: "/imgs/demo-product-2.png",
            images: ["/imgs/demo-product-3.png", "/imgs/demo-product-4.png"],
            description:
                "Our New Balance 2002R sneakers prove that slick kicks can still be comfortable. The suede and mesh upper is inspired by running shoes from the 2000s for a modern take on a throwback aesthetic. The ABZORB midsole and ABZORB SBS heel cushioning deliver limitless comfort while the Stability Web and N-ergy technologies offer arch support and shock absorption to help you go all day.",
        },
		
        quantity: 2,
        price: 500,
        subtotal: 1000,
        size: 5,
    }];

    return (
        <>
            <div className="flex flex-col lg:flex-row gap-8">
                <div className="w-full lg:w-8/12">
                    <CartTable  cartItems={cartItems}/>
                </div>
                <div className="w-full lg:w-4/12">
                    <CartSummary />
                </div>
            </div>

            <div className="mt-16">
                <ProductSuggestions />
            </div>
        </>
    );
}
