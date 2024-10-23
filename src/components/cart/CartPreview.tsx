"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import { useRouter } from "next/navigation";
import { ShoppingCart, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CustomQuantitySelector } from "@/components/ui/CustomQuantitySelector";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const CartItem = () => {
    return (
        <>
            <div className="flex items-center gap-4">
                {/* Image */}
                <div className="relative h-20 w-2/12">
                    <Image src="/imgs/demo-product-2.png" alt="product image" fill className="w-full object-cover" />
                </div>

                {/* Details */}
                <div>
                    <p className="font-bold uppercase text-sm">New Balance</p>
                    <p className="text-xs uppercase font-medium text-gray-800">2002 men's sneakers shoes - grey</p>
                    <p className="font-bold text-red-700 text-xs">MYR 413.00</p>
                    <p className="line-through text-xs text-gray-500">MYR 689.00</p>
                    <p className="text-xs">
                        Size: <span>US 8.5</span>
                    </p>
                    <div className="mt-3 flex items-center gap-4 text-xs">
                        Qty <CustomQuantitySelector className="h-[28px] w-[140px]" />
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

interface CartPreviewProps extends React.HTMLAttributes<HTMLButtonElement> {}
export const CartPreview = forwardRef<HTMLButtonElement, CartPreviewProps>(({ className, ...props }, ref) => {

	const router = useRouter();

    return (
        <Popover>
            <PopoverTrigger className={cn(className)} {...props}>
                <ShoppingCart size={16} />
            </PopoverTrigger>
            <PopoverContent className="w-[400px]" align="end">
                {false && <p className="text-center italic text-gray-500">No Items in Cart.</p>}

                <div className="flex flex-col gap-4 overflow-auto max-h-80">
                    <CartItem />
                    <CartItem />
                </div>

                <div className="border-t border-slate-200 pt-3">
                    <p className="flex items-center justify-between font-bold">
                        <span>SUBTOTAL</span> <span>MYR 874.00</span>
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
