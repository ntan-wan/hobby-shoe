"use client";

import { cn, sleep } from "@/lib/utils";
import { forwardRef, useState } from "react";
import { cva } from "class-variance-authority";
import { Rating } from "@/components/ui/Rating";
import { Button } from "@/components/ui/button";
import { FreeShippingBanner } from "@/components/ui/FreeShippingBanner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Product, Region } from "@/lib/types";

const ProductOrderVariants = cva(["border border-gray-300 rounded-md p-4 h-full flex flex-col"]);

interface ProductOrderProps extends React.HTMLAttributes<HTMLDivElement> {
    product: Product;
}
export const ProductOrder = forwardRef<HTMLDivElement, ProductOrderProps>(({ product, ...props }, ref) => {
    console.log("products", product);
    const [selectedUOM, setSelectedUOM] = useState<Region>("US");
    const [selectedSize, setSelectedSize] = useState<number | string>(0);
    const [quantity, setQuantity] = useState<number | string>(1);
    const [loading, setLoading] = useState(false);

    const uom = Object.keys(product?.sizes ?? {});
    const availableSize = product?.sizes?.[selectedUOM].find((s) => s.size == selectedSize);

    const handleSelectUOM = (uom: Region) => {
        setSelectedUOM(uom);
        setSelectedSize(product?.sizes[uom][0]?.size ?? 0);
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
                <span className="font-medium">{product?.categories?.map((category) => category.name).join(", ")}</span> |{" "}
                <span className="text-gray-400">0198-ADIIF188300O004</span>
            </p>
            <p className="text-2xl mt-4 flex items-center gap-2">
                <span className="font-bold text-red-700">
                    {product?.prices?.[0]?.currency?.code} {product?.prices?.[0]?.value ?? "-"}
                </span>

                {product?.prices?.[1] && (
                    <span className="line-through text-base">
                        {product?.prices?.[1]?.currency?.code} {product?.prices?.[1]?.value ?? "-"}
                    </span>
                )}
            </p>

            {/* Rating */}
            <Rating score={product?.rating} className="" />

            {/* UOM */}
            <Select onValueChange={(value: Region) => handleSelectUOM(value)}>
                <SelectTrigger className="w-full mt-8">
                    <SelectValue placeholder="UOM" />
                </SelectTrigger>
                <SelectContent>
                    {uom.map((unit) => (
                        <SelectItem key={unit} value={unit}>
                            {unit}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {/* Size */}
            <div className="mt-2 flex flex-wrap -m-2">
                {product.sizes?.[selectedUOM]
                    ?.map((s) => s.size)
                    ?.map((size) => (
                        <div className="w-full lg:w-3/12 p-2" key={size}>
                            <Button className={cn("w-full", selectedSize == size ? "c-highlight" : "")} variant="outline" onClick={() => handleSelectSize(size)}>
                                {size}
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
                    {Array.from({ length: availableSize?.quantity ?? 0 }).map((_, index) => (
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
