import Image from "next/image";
import { cn } from "@/lib/utils";
import { Product } from "@/lib/types";
import React, { forwardRef } from "react";
import { cva } from "class-variance-authority";
import { Rating } from "@/components/ui/Rating";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
    product: Product;
}

const productCardVariants = cva(["cursor-pointer hover:border-gray-400 transition-colors"]);

export const ProductCard = forwardRef<HTMLDivElement, ProductCardProps>(({ product, className, ...props }, ref) => {

    return (
        <Card className={cn(productCardVariants(), className)} {...props} ref={ref}>
            <CardHeader className="border-b border-slate-200">
                <div className="relative h-52">
                    <Image fill src={product?.thumbnail ?? "/imgs/product-placeholder.png"} alt="product image" className="w-full object-cover rounded-lg" sizes="(min-width: 1024px) 16vw , 100vw"/>
                </div>
            </CardHeader>
            <CardContent className="pt-2 text-sm">
                <p className="font-bold uppercase">{product?.brand ?? "-"}</p>
                <p className="mt-1 font-bold uppercase">{product?.name ?? "-"}</p>
                <p className="mt-1">{product?.categories?.map((category) => category.name).join(", ") ?? "-"}</p>
                <p className="mt-1"><span className="font-bold">Color:</span> {product?.color ?? "-"}</p>

                <div className="mt-1 flex gap-2 items-center">
                    {/* Current price */}
                    <p className="text-red-700 font-bold text-lg">
                        <span>{(product?.prices?.[0]?.currency?.code ?? "-") + ' ' + (product?.prices?.[0]?.value?.toFixed(2) ?? '-')}</span>
                    </p>

                    {/* Prev Price */}
                    {product?.prices?.[1] && <p className="line-through text-sm">
                        <span>{(product?.prices?.[1]?.currency?.code ?? "-") + ' ' + (product?.prices?.[1]?.value?.toFixed(2) ?? '-')}</span>
                    </p>}
                </div>
            </CardContent>
            <CardFooter className="flex gap-2">
                <Rating score={product.rating} /> <span>({product?.rating})</span>
            </CardFooter>
        </Card>
    );
});

ProductCard.displayName = "ProductCard";
