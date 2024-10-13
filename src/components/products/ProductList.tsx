"use client";

import { ProductCard } from "@/components/products/ProductCard";
import { CircleX } from "lucide-react";

const FilterBadege = ({label, onRemove, ...props}) => {
    return (
        <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 w-fit">
            <p>{label}</p>
            <CircleX size={16}  onClick={onRemove}/>
        </div>
    );
};

export const ProductList = () => {
    const products = [
        {
            id: 1,
            brand: "New Balance",
            name: "2002 men's sneakers shoes - black",
            color: "black",
            price: 538,
            rating: 0,
        },
        {
            id: 2,
            brand: "New Balance",
            name: "2002 men's sneakers shoes - black",
            color: "black",
            price: 538,
            rating: 0,
        },
        {
            id: 3,
            brand: "New Balance",
            name: "2002 men's sneakers shoes - black",
            color: "black",
            price: 538,
            rating: 0,
        },
        {
            id: 4,
            brand: "New Balance",
            name: "2002 men's sneakers shoes - black",
            color: "black",
            price: 538,
            rating: 0,
        },
        {
            id: 5,
            brand: "New Balance",
            name: "2002 men's sneakers shoes - black",
            color: "black",
            price: 538,
            rating: 0,
        },
    ];

    return (
        <>
            <div>
				<FilterBadege  label="Men" onRemove={() => {}}/>
			</div>

            <div className="mt-2 flex flex-wrap items-center -m-2">
                {products.map((product) => (
                    <div key={product.id} className="p-2  w-full lg:w-3/12">
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
        </>
    );
};
