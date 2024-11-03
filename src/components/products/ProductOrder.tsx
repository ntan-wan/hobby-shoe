"use client";

import { cn, sleep } from "@/lib/utils";
import { Product, Region } from "@/lib/types";
import { forwardRef, useEffect, useState } from "react";
import { cva } from "class-variance-authority";
import { Rating } from "@/components/ui/Rating";
import { Button } from "@/components/ui/button";
import { FreeShippingBanner } from "@/components/ui/FreeShippingBanner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ProductOrderVariants = cva(["border border-gray-300 rounded-md p-4 h-full flex flex-col"]);

interface ProductOrderProps extends React.HTMLAttributes<HTMLDivElement> {
    product: Product;
}
export const ProductOrder = forwardRef<HTMLDivElement, ProductOrderProps>(({ product, ...props }, ref) => {
	
    const [selectedUOM, setSelectedUOM] = useState<Region>("US");
    const [selectedSize, setSelectedSize] = useState<number | string>(0);
    const [quantity, setQuantity] = useState<number | string>(1);
    const [loading, setLoading] = useState(false);

    const uom = [... new Set(product?.sizes?.map((s) => s.standard))];
    const availableSize = product?.sizes?.filter((s) => s.standard == selectedUOM);

    useEffect(() => {
        setSelectedUOM((uom?.[0] as Region) ?? "US");
        setSelectedSize(product?.sizes.find((s) => s.standard == selectedUOM)?.value ?? 0);
    }, []);

    const handleSelectUOM = (uom: Region) => {
        setSelectedUOM(uom);
        setSelectedSize(product?.sizes.find((s) => s.standard == uom)?.value ?? 0);
    };
    const handleSelectSize = (value: number | string) => {
        setSelectedSize(value);
    };
    const handleSelectQuantity = (value: string) => {
        setQuantity(value);
    };
    const handleAddItem = async () => {
        setLoading(true);
        await sleep(500);
        setLoading(false);
    };

    console.log("Undefined variable", quantity);

    return (
        <div className={cn(ProductOrderVariants())} ref={ref} {...props}>
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
            <Select onValueChange={(value: Region) => handleSelectUOM(value)} defaultValue={selectedUOM}>
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
                    ?.filter((s) => s.standard == selectedUOM)
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
            <Select defaultValue="1" onValueChange={(value) => handleSelectQuantity(value)}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Quantity" />
                </SelectTrigger>
                <SelectContent>
                    {Array.from({ length: availableSize?.find((s) => s.standard == selectedUOM && s.value == selectedSize)?.quantity ?? 0 }).map((_, index) => (
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
                <Button loading={loading} onClick={handleAddItem} className="w-full p-6">
                    Add to Cart
                </Button>
            </div>
        </div>
    );
});

ProductOrder.displayName = "ProductOrder";
