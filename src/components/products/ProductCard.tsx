import Image from "next/image";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
    product: any;
}

export const ProductCard = forwardRef<HTMLDivElement, ProductCardProps>(({ product, className, ...props }, ref) => {
    return (
        <Card className={cn(className)} {...props}>
            <CardHeader className="border-b border-slate-200">
                <div className="relative h-48">
                    <Image fill src="/imgs/demo-product-2.png" alt="product image" className="w-full object-cover" />
                </div>
            </CardHeader>
            <CardContent className="pt-2">
                <p>{product?.brand ?? "-"}</p>
                <p>{product?.name ?? "-"}</p>
                <p>{product?.category ?? "-"}</p>
                <p>{product?.color ?? "-"}</p>
                <p>
                    <span>{product?.price ?? "-"}</span>
                </p>
            </CardContent>
            <CardFooter>
                <p>{product?.rating ?? "-"}</p>
            </CardFooter>
        </Card>
    );
});

ProductCard.displayName = "ProductCard";
