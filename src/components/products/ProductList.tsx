"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "@/lib/constants";
import { getProducts } from "@/servicesFrontend/product.service";
import { CircleX } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductCard } from "@/components/products/ProductCard";

interface FilterBadegeProps extends React.HTMLAttributes<HTMLDivElement> {
    label: string;
    onRemove: () => void;
}
const FilterBadege = ({ label, onRemove, ...props }: FilterBadegeProps) => {
    return (
        <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 w-fit">
            <p>{label}</p>
            <CircleX size={16} onClick={onRemove} />
        </div>
    );
};

export const ProductList = () => {
    /* HOOKS */
    const router = useRouter();
    const { data: products, isFetching: productIsFetching } = useQuery({
        queryKey: [QUERY_KEY.PRODUCTS],
        select: (res) => res?.data,
        queryFn: getProducts,
    });

    /* EVENT HANDLERS */
    const handleSelectProduct = (productId: string | number) => {
        router.push(`/products/${productId}`);
    };

    if (productIsFetching) {
        return (
            <div className="flex flex-wrap -m-2">
                {Array.from({ length: 8 }).map((_, index) => (
                    <div className="w-full lg:w-3/12 p-2" key={index}>
                        <Skeleton key={index} className="h-60"></Skeleton>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <>
            <div>
                <FilterBadege label="Men" onRemove={() => {}} />
            </div>

            <div className="mt-2 flex flex-wrap items-center -m-2">
                {products?.length ? (
                    products?.map((product) => (
                        <div key={product.id} className="p-2  w-full lg:w-3/12">
                            <ProductCard product={product} onClick={() => handleSelectProduct(product.id)} />
                        </div>
                    ))
                ) : (
                    <p className="text-center italic text-gray-500">No products found</p>
                )}
            </div>
        </>
    );
};
