"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { QUERY_KEY } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";
import { Product, ProductsData } from "@/lib/types";
import { getProducts } from "@/servicesFrontend/product.service";
import { CircleX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductCard } from "@/components/products/ProductCard";
import { scrollToBottom } from "@/lib/utils";

interface FilterBadegeProps extends React.HTMLAttributes<HTMLDivElement> {
    label: string;
    onRemove: () => void;
}
const FilterBadge = ({ label, onRemove, ...props }: FilterBadegeProps) => {
    return (
        <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 w-fit" {...props}>
            <p>{label}</p>
            <CircleX size={16} onClick={onRemove} />
        </div>
    );
};

interface ProductListProps extends React.HTMLAttributes<HTMLDivElement> {
    products: ProductsData[];
    isLoading?: boolean;
}
export const ProductList = ({ products = [], isLoading = false, ...props }: ProductListProps) => {
    /* STATES */
    const [queryParams, setQueryParams] = useState<{ page: number; limit: number } | null>(null);

    /* HOOKS */
    const router = useRouter();

    /* QUERIES */
    const { data: moreProducts, isFetching: isFetchingMoreProducts } = useQuery({
        queryKey: [QUERY_KEY.MORE_PRODUCTS, queryParams],
        queryFn: ({ queryKey }) => {
            const { page = 1, limit = 10 } = queryKey[1] as { page: number; limit: number };
            return getProducts(page, limit);
        },
        enabled: Boolean(queryParams),
    });
    const _productsData = moreProducts?.data ?? products;

    /* EVENT HANDLERS */
    const handleSelectProduct = (productId: string | number) => {
        router.push(`/products/${productId}`);
    };
    const handleRefetch = () => {
        const nextPage = _productsData?.currentPage + 1;
        const limit = 10;
        const totalProducts = nextPage * limit;
        setQueryParams({ page: nextPage, limit: totalProducts });
		scrollToBottom();
    };

    if (isLoading || isFetchingMoreProducts) {
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
                <FilterBadge label="Men" onRemove={() => {}} />
            </div>

            <div className="mt-4 flex flex-wrap items-center -m-2" {...props}>
                {_productsData?.products?.length ? (
                    _productsData?.products?.map((product: Product) => (
                        <div key={product.id} className="p-2  w-full lg:w-3/12">
                            <ProductCard product={product} onClick={() => handleSelectProduct(product.id)} />
                        </div>
                    ))
                ) : (
                    <p className="text-center italic text-gray-500">No products found</p>
                )}
            </div>

            <div className="mt-8 flex items-center justify-center">
                <Button disabled={(queryParams?.limit ?? 0) >= _productsData?.totalProducts} variant="outline" loading={isFetchingMoreProducts} onClick={() => handleRefetch()}>
                    Load More
                </Button>
            </div>
        </>
    );
};
