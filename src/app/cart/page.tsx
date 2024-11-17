"use client";

import { CartTable } from "@/components/cart/CartTable";
import { CartSummary } from "@/components/cart/CartSummary";
import { ProductSuggestions } from "@/components/products/ProductSuggesstions";
import { useAppSelector } from "@/lib/hooks";


export default  function CartPage() {

	const cartItems =useAppSelector((state) => state.cart.items);

    return (
		<div className="c-page">
			<h1 className="c-title c-title-1 text-center my-4">Shopping Cart</h1>

            <div className="flex flex-col lg:flex-row gap-8">
                <div className="w-full lg:w-8/12">
                    <CartTable  cartItems={cartItems}/>
                </div>
                <div className="w-full lg:w-4/12">
                    <CartSummary  cartItems={cartItems}/>
                </div>
            </div>

            <div className="mt-16">
                <ProductSuggestions />
            </div>
		</div>
    );
}
