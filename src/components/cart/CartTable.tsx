"use client";

import Image from "next/image";
import { forwardRef } from "react";
import { CartItem } from "@/lib/types";
import { useAppDispatch } from "@/lib/hooks";
import { cn, formatPrice } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { updateCartItemQuantity, removeFromCart } from "@/lib/slices/cartSlice";

import { useToast } from "@/hooks/use-toast";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CustomQuantitySelector } from "@/components/ui/CustomQuantitySelector";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const cartTableVariants = cva([""]);

interface CartTableProps extends React.HTMLAttributes<HTMLTableElement> {
    cartItems: CartItem[];
}
export const CartTable = forwardRef<HTMLTableElement, CartTableProps>(({ cartItems, className, ...props }, ref) => {
    /* HOOKS */
    const { toast } = useToast();
    const dispatch = useAppDispatch();

    /* EVENT HANDLERS  */
    const handleDelete = (id: string | number) => {
        dispatch(removeFromCart(id));
        toast({
            title: "Success",
            variant: "success",
            duration: 3000,
            description: "Deleted Successfully.",
        });
    };
    const handleIncrement = (value: number, id: string | number) => {
        dispatch(updateCartItemQuantity({ id, quantity: value }));
    };
    const handleDecrement = (value: number, id: string | number) => {
        dispatch(updateCartItemQuantity({ id, quantity: value }));
    };

    return (
        <Table {...props} ref={ref} className={cn(cartTableVariants(), className)} wrapperClassName="max-h-[370px]" style={{ borderCollapse: "separate" }}>
            <TableCaption>A list of your cart items.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="sticky top-0 z-10 bg-white border-b border-gray-200">No.</TableHead>
                    <TableHead className="w-[100px] sticky top-0 z-10 bg-white border-b border-gray-200">ITEM</TableHead>
                    <TableHead className="sticky top-0 z-10 bg-white border-b border-gray-200">PRICE</TableHead>
                    <TableHead className="sticky top-0 z-10 bg-white border-b border-gray-200">QUANTITY</TableHead>
                    <TableHead className="sticky top-0 z-10 bg-white border-b border-gray-200 text-right">SUBTOTAL</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {!cartItems?.length && (
                    <TableRow>
                        <TableCell colSpan={4} className="text-center text-gray-500 italic">
                            No items in cart.
                        </TableCell>
                    </TableRow>
                )}

                {cartItems?.map((cartItem, index) => (
                    <TableRow key={cartItem.product.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell className="font-medium">
                            <div className="flex items-center gap-4">
                                {/* Item imge */}
                                <div className="relative h-40 w-64">
                                    <Image fill src={cartItem.product.thumbnail ?? "/imgs/product-placeholder.png"} alt="product image" className="w-6/12 object-cover" />
                                </div>

                                {/* Item details */}
                                <div>
                                    <p className="font-bold">{cartItem.product.brand}</p>
                                    <p>{cartItem.product.name}</p>
                                    <p>
                                        <span className="font-bold">Size: </span>
                                        {cartItem.standard} {cartItem.size ?? "-"}
                                    </p>

                                    {/* Action buttons */}
                                    <div className="mt-4 flex items-center">
                                        <Button variant="ghost" size="icon">
                                            <Pencil className="text-blue-500" size={16} />
                                        </Button>
                                        <Button variant="ghost" size="icon" onClick={() => handleDelete(cartItem.product.id)}>
                                            <Trash2 className="text-red-500" size={16} />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </TableCell>
                        <TableCell className="">
                            <p className="text-red-700 font-bold">
                                {cartItem.product.prices?.[0]?.currency?.code} {formatPrice(cartItem.product.prices?.[0]?.value)}
                            </p>
                            {cartItem.product.prices?.[1] && (
                                <p className="text-sm line-through text-gray-400">
                                    {cartItem.product.prices?.[1]?.currency?.code} {formatPrice(cartItem.product.prices?.[1]?.value)}
                                </p>
                            )}
                        </TableCell>
                        <TableCell className="">
                            <CustomQuantitySelector
                                value={cartItem.quantity}
                                onDecrement={(value) => handleDecrement(value, cartItem.product.id)}
                                onIncrement={(value) => handleIncrement(value, cartItem.product.id)}
                            />
                        </TableCell>
                        <TableCell className=" text-right">MYR {formatPrice(cartItem.product.prices?.[0]?.value * cartItem.quantity)}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
});

CartTable.displayName = "CartTable";
