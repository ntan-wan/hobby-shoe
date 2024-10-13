"use client";

import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import { cva } from "class-variance-authority";
import { FreeShippingBanner } from "@/components/ui/FreeShippingBanner";
import { useState } from "react";
import { Rating } from "@/components/ui/Rating";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ProductOrderVariants = cva(["border border-gray-300 rounded-md p-4 h-full flex flex-col"]);

export const ProductOrder = forwardRef(({ ...props }, ref) => {
    const [selectedUOM, setSelectedUOM] = useState("us");

    const uom = [
        {
            id: "us",
            label: "US",
            value: "us",
            options: [
                { id: 1, label: "US 9" },
                { id: 2, label: "US 9.5" },
                { id: 3, label: "US 10" },
            ],
        },
    ];

    const quantity = [
        { label: "1", value: 1 },
        { label: "2", value: 2 },
        { label: "3", value: 3 },
        { label: "4", value: 4 },
        { label: "5", value: 5 },
        { label: "6", value: 6 },
        { label: "7", value: 7 },
        { label: "8", value: 8 },
        { label: "9", value: 9 },
        { label: "10", value: 10 },
    ];

    const handleSelect = (value: string) => {
        setSelectedUOM(value);
    };

    return (
        <div className={cn(ProductOrderVariants())}>
            <p className="text-2xl font-bold text-red-700 uppercase">Adidas</p>
            <p className="text-4xl font-bold uppercase mt-2">new balance 1906 men&apos;s sneakers shoes - aqua</p>
            <p className="text-xl mt-4"><span className="font-medium">Kids</span> | <span className="text-gray-400">0198-ADIIF188300O004</span></p>
            <p className="text-2xl mt-4 flex items-center gap-2"><span className="font-bold text-red-700">MYR 281.00</span> <span className="line-through text-base">MYR 469.00</span></p>

			{/* Rating */}
			<Rating score={4} className=""/>

            <Select onValueChange={(value) => handleSelect(value)}>
                <SelectTrigger className="w-full mt-8">
                    <SelectValue placeholder="UOM" />
                </SelectTrigger>
                <SelectContent>
                    {uom.map((unit) => (
                        <SelectItem key={unit.id} value={unit.value}>
                            {unit.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {/* UOM */}
            <div className="mt-2 flex flex-wrap -m-2">
                {uom
                    ?.find((unit) => unit.value == selectedUOM)
                    ?.options?.map((option) => (
                        <div className="w-full lg:w-3/12 p-2" key={option.id}>
                            <Button className="w-full" variant="outline">
                                {option.label}
                            </Button>
                        </div>
                    ))}
            </div>

            <FreeShippingBanner className="mt-8" />

            {/* Quantity */}
            <label className="c-label mt-4">Quantity</label>
            <Select defaultValue="1">
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Quantity" />
                </SelectTrigger>
                <SelectContent>
                    {quantity.map((quantity) => (
                        <SelectItem key={quantity.value} value={quantity.label}>
                            {quantity.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {/* Buy */}
            <div className="flex items-center gap-2 mt-auto">
                <Button className="w-full p-6" variant="outline">Buy Now</Button>
                <Button className="w-full p-6">Add to Cart</Button>
            </div>
        </div>
    );
});

ProductOrder.displayName = "ProductOrder";
