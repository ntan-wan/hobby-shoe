"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import { useRouter } from "next/navigation";
import type {  CartItem } from "@/lib/types";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { updateCartItemQuantity } from "@/lib/slices/cartSlice";

import { ShoppingCart, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CustomQuantitySelector } from "@/components/ui/CustomQuantitySelector";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface CartItemProps extends React.HTMLAttributes<HTMLDivElement> {
    item: CartItem;
}
const CartItem = ({ item, ...props }: CartItemProps) => {

	/* HOOKS */
	const dispatch = useAppDispatch();

	/* METHODS */
	function handleIncrement() {
		dispatch(updateCartItemQuantity({ id: item.product.id, quantity: item.quantity + 1 }));
	};

	function handleDecrement() {	
		dispatch(updateCartItemQuantity({ id: item.product.id, quantity: item.quantity - 1 }));
	}
	
    return (
        <>
            <div className="flex items-center gap-4" {...props}>
                {/* Image */}
                <div className="relative h-20 w-2/12">
                    <Image src={item.product.thumbnail ?? "/imgs/product-placeholder.png"} alt="product image" fill className="w-full object-cover" />
                </div>

                {/* Details */}
                <div>
                    <p className="font-bold uppercase text-sm">{item.product.brand}</p>
                    <p className="text-xs uppercase font-medium text-gray-800">{item.product.name}</p>
                    <p className="font-bold text-red-700 text-xs">{item.product.prices[0] ? item.product.prices?.[0]?.currency?.code + " " + item.product.prices?.[0]?.value : "-"}</p>
                    {item.product.prices[1] && <p className="line-through text-xs text-gray-500">{item.product.prices[1]?.currency?.code + " " + item.product.prices[1]?.value}</p>}
                    <p className="text-xs">
                        Size:<span>{item.standard} {item.size}</span>
                    </p>
                    <div className="mt-3 flex items-center gap-4 text-xs">
                        Qty <CustomQuantitySelector className="h-[28px] w-[140px]" value={item.quantity} onIncrement={() => handleIncrement()} onDecrement={() => handleDecrement()}/>
                    </div>
                </div>

                {/* Remove */}
                <Button size="icon" className="self-start ml-auto" variant="ghost">
                    <X size={16} />
                </Button>
            </div>

            <Separator className="my-3" />
        </>
    );
};

export const CartPreview = forwardRef<HTMLButtonElement, React.HTMLAttributes<HTMLButtonElement>>(({ className, ...props }, ref) => {
    const router = useRouter();
    const items = useAppSelector((state) => state.cart.items);

	const calculateSubtotal = (items: CartItem[]) => {
		let total = 0;
		items?.forEach((item) => {
			total += item.product.prices[0]?.value * item.quantity;
		});
		return total;
	}

    return (
        <Popover>
            <PopoverTrigger className={cn(className)} {...props} ref={ref}>
                <ShoppingCart size={16} />
            </PopoverTrigger>
            <PopoverContent className="w-[400px]" align="end">
                {!items?.length && <p className="text-center italic text-gray-500 min-h-[80px] flex items-center justify-center">No Items in Cart.</p>}

                {items?.length > 0 && (
                    <div className="flex flex-col gap-4 overflow-auto max-h-80">
                        {items?.map((item) => (
                            <CartItem key={item.product.id} item={item} />
                        ))}
                    </div>
                )}

                <div className="border-t border-slate-200 pt-3">
                    <p className="flex items-center justify-between font-bold">
                        <span>SUBTOTAL</span> <span>MYR {calculateSubtotal(items)}</span>
                    </p>

                    {/* Action */}
                    <div className="flex flex-col gap-3 mt-4">
                        <Button className="w-full">Buy now</Button>
                        <Button variant="outline" className="w-full" onClick={() => router.push("/cart")}>
                            View Cart
                        </Button>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
});

CartPreview.displayName = "CartPreview";
