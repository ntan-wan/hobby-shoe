"use client";

import { cn } from "@/lib/utils";
import { Product, Region } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { useAppDispatch } from "@/lib/hooks";
import { cva } from "class-variance-authority";
import { addToCart } from "@/lib/slices/cartSlice";
import { forwardRef, useEffect, useState } from "react";
import { CartItem } from "@/lib/types";

import { Rating } from "@/components/ui/Rating";
import { Button } from "@/components/ui/button";
import { FreeShippingBanner } from "@/components/ui/FreeShippingBanner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ProductOrderVariants = cva(["border border-gray-300 rounded-md p-4 h-full flex flex-col"]);

interface ProductOrderProps extends React.HTMLAttributes<HTMLDivElement> {
    product: Product;
}
export const ProductOrder = forwardRef<HTMLDivElement, ProductOrderProps>(({ product, ...props }, ref) => {
    const uom = [...new Set(product?.sizes?.map((s) => s.standard))];
    const [selectedStandard, setselectedStandard] = useState(uom[0]);
    const [selectedSize, setSelectedSize] = useState<number | string>(0);
    const [quantity, setQuantity] = useState<number | string>(1);

    const availableSize = product?.sizes?.filter((s) => s.standard == selectedStandard);
    const availableQuantity = availableSize?.find((s) => s.standard == selectedStandard && s.value == selectedSize)?.quantity;
    const dispatch = useAppDispatch();

    useEffect(() => {
        setSelectedSize(product?.sizes.find((s) => s.standard == selectedStandard)?.value ?? 0);
    }, []);
    const { toast } = useToast();

    /* EVENT HANDLERS */
    const handleSelectUOM = (uom: Region) => {
        setselectedStandard(uom);
        setSelectedSize(product?.sizes.find((s) => s.standard == uom)?.value ?? 0);
        setQuantity(1);
    };
    const handleSelectSize = (value: number | string) => {
        setSelectedSize(value);
    };
    const handleSelectQuantity = (value: string) => {
        setQuantity(value);
    };
    const handleAddItem = async () => {

		const cartItem : CartItem = {
			product,
			quantity: Number(quantity),
			size: Number(selectedSize),
			standard: selectedStandard
		};
        dispatch(addToCart(structuredClone(cartItem)));
        toast({
            title: "Success",
            variant: "success",
			duration: 3000,
            description: "Added Successfully.",
        });
    };

    return (
        <div className={cn(ProductOrderVariants())} ref={ref} {...props}>
            {/* <Toaster /> */}
            <p className="text-2xl font-bold text-red-700 uppercase">{product?.brand}</p>
            <p className="text-4xl font-bold uppercase mt-2">{product?.name}</p>
            <p className="text-xl mt-4">
                <span className="font-medium">{product?.categories?.length ? product?.categories?.map((category) => category.name).join(", ") : "-"}</span> |{" "}
                <span className="text-gray-400">0198-ADIIF188300O004</span>
            </p>
            <p className="text-2xl mt-4 flex items-center gap-2">
                <span className="font-bold text-red-700">
                    {product?.prices?.[0]?.currency?.code} {product?.prices?.[0]?.value?.toFixed(2) ?? "-"}
                </span>

                {product?.prices?.[1] && (
                    <span className="line-through text-base">
                        {product?.prices?.[1]?.currency?.code} {product?.prices?.[1]?.value?.toFixed(2) ?? "-"}
                    </span>
                )}
            </p>

            {/* Rating */}
            <div className="flex gap-3 items-center">
                <Rating score={product.rating} /> <span>({product?.rating})</span>
            </div>

            {/* UOM */}
            <Select onValueChange={(value: Region) => handleSelectUOM(value)} defaultValue={selectedStandard}>
                <SelectTrigger className="w-full mt-8">
                    <SelectValue placeholder="UOM" />
                </SelectTrigger>
                <SelectContent>
                    {uom.map((unit, index) => (
                        <SelectItem key={`${unit}-${index}`} value={unit}>
                            {unit}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {/* Size */}
            <div className="mt-2 flex flex-wrap -m-2">
                {product.sizes
                    ?.filter((s) => s.standard == selectedStandard)
                    ?.map((size) => (
                        <div className="w-full lg:w-3/12 p-2" key={size.id}>
                            <Button className={cn("w-full", selectedSize == size.value ? "c-highlight" : "")} variant="outline" onClick={() => handleSelectSize(size.value)}>
                                {size.value}
                            </Button>
                        </div>
                    ))}
            </div>

            <FreeShippingBanner className="mt-8" />

            {/* Quantity */}
            <label className="c-label mt-4">Quantity</label>
            <Select defaultValue="1" onValueChange={(value) => handleSelectQuantity(value)} disabled={!availableQuantity} value={String(quantity)}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Quantity" />
                </SelectTrigger>
                <SelectContent>
                    {Array.from({ length: availableQuantity ?? 0 }).map((_, index) => (
                        <SelectItem key={index} value={String(index + 1)}>
                            {index + 1}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {/* Buy */}
            <div className="flex items-center gap-2 mt-auto">
                <Button className="w-full p-6" variant="outline">
                    Buy Now
                </Button>
                <Button  onClick={handleAddItem} className="w-full p-6">
                    Add to Cart
                </Button>
            </div>
        </div>
    );
});

ProductOrder.displayName = "ProductOrder";
