import Image from "next/image";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { CartItem } from "@/lib/types";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CustomQuantitySelector } from "@/components/ui/CustomQuantitySelector";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface CartTableProps extends React.HTMLAttributes<HTMLTableElement> {
    cartItems: CartItem[];
}

export const CartTable = forwardRef<HTMLTableElement, CartTableProps>(({ cartItems, className, ...props }, ref) => {
    return (
        <Table {...props} className={cn(className)} ref={ref}>
            <TableCaption>A list of your cart items.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">ITEM</TableHead>
                    <TableHead>PRICE</TableHead>
                    <TableHead>QUANTITY</TableHead>
                    <TableHead className="text-right">SUBTOTAL</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {false && (
                    <TableRow>
                        <TableCell colSpan={4} className="text-center text-gray-500 italic">
                            No items in cart.
                        </TableCell>
                    </TableRow>
                )}

                {cartItems?.map((item) => (
                    <TableRow key={item.id}>
                        <TableCell className="font-medium w-3/12">
                            <div className="flex items-center gap-4">
                                {/* Item imge */}
                                <div className="relative h-40 w-64">
                                    <Image fill src="/imgs/demo-product-2.png" alt="product image" className="w-full object-cover" />
                                </div>

                                {/* Item details */}
                                <div>
                                    <p className="font-bold">{item.product.brand}</p>
                                    <p>{item.product.name}</p>
                                    <p>
                                        <span className="font-bold">Size: </span> 
										{item.size ?? "-"}
                                    </p>

                                    {/* Action buttons */}
                                    <div className="mt-4 flex items-center">
                                        <Button variant="ghost" size="icon">
                                            <Pencil className="text-blue-500" size={16} />
                                        </Button>
                                        <Button variant="ghost" size="icon">
                                            <Trash2 className="text-red-500" size={16} />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </TableCell>
                        <TableCell className="w-3/12">
                            <p className="text-red-700 font-bold">
                                MYR {item.product?.prices.current} <span className="text-black">(-30%)</span>
                            </p>
                            <p className="text-sm line-through text-gray-400">MYR {item.product?.prices.previous}</p>
                        </TableCell>
                        <TableCell className="w-3/12">
                            {/* Quantity selector */}
                            <CustomQuantitySelector />
                        </TableCell>
                        <TableCell className=" w-3/12 text-right">$250.00</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
});

CartTable.displayName = "CartTable";
