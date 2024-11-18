import { forwardRef } from "react";
import { CartItem } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface CartSummaryProps extends React.HTMLAttributes<HTMLDivElement> {
    cartItems: CartItem[];
}
export const CartSummary = forwardRef<HTMLDivElement, CartSummaryProps>(({ cartItems, ...props }, ref) => {
    const calculateTotal = (cartItems: CartItem[]) => {
        const total = formatPrice(cartItems.reduce((total, cartItem) => total + cartItem.product.prices?.[0]?.value * cartItem.quantity, 0));
        const currency = cartItems?.[0]?.product?.prices?.[0]?.currency?.code;
        return `${currency} ${total}`;
    };

    return (
        <Card {...props} ref={ref}>
            <CardHeader>
                <CardTitle className="text-2xl">Summary</CardTitle>
                <CardDescription>Overview of items, quantities, and total cost.</CardDescription>
            </CardHeader>
            <CardContent>
                {/* Subtotal */}
                <p className="flex items-center justify-between">
                    <span>Subtotal</span>
                    <span>{calculateTotal(cartItems)}</span>
                </p>

                <Separator className="my-4" />

                <p className="flex items-center justify-between font-bold">
                    <span>Order Amount</span>
                    <span>{calculateTotal(cartItems)}</span>
                </p>

                <Separator className="my-4" />

                {/* Discount */}
                <div className="w-full">
                    <label className="c-label">Input Discount Code</label>
                    <div className="flex">
                        <Input className="flex-[8] rounded-r-none" placeholder="Enter discount code" />
                        <Button className="flex-[4] rounded-l-none">Apply</Button>
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <Button className="w-full block">Checkout</Button>
            </CardFooter>
        </Card>
    );
});

CartSummary.displayName = "CartSummary";
