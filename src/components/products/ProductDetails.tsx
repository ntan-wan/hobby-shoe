"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface ProductDetailsProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof ProductDetailsVariants> {
    product: any;
}

const ProductDetailsVariants = cva(["border border-gray-300 rounded-md p-4 h-full min-h-60"]);
export const ProductDetails = ({ product, className, ...props }: ProductDetailsProps) => {

    return (
        <Tabs defaultValue="details" className={cn(ProductDetailsVariants(), className)}>
            <TabsList className="justify-start flex">
                <TabsTrigger value="details" className="text-lg font-semibold">
                    Details
                </TabsTrigger>
                <TabsTrigger value="reviews" className="text-lg font-semibold">
                    Reviews
                </TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="pt-4">
                {false && 
				 <>
					<Skeleton className="h-6 w-3/4"></Skeleton>
					<Skeleton className="h-6 mt-4"></Skeleton>
					<Skeleton className="h-6 mt-4"></Skeleton>
				 </>
				}

                {true && (
                    <>
                        <p className="text-2xl font-medium">{product?.name} - Product Details</p>
                        <p className="mt-2">{product?.description ?? "-"}</p>
                        <p className="mt-8 text-gray-500">Size Disclaimer:</p>
                        <p>There may be a 1-2cm difference in measurements depending on the development and manufacturing process.</p>
                        <p className="mt-4 text-gray-500">Color Disclaimer:</p>
                        <p>
                            Actual colors may vary. This is due to the fact that every computer monitor has a different capability to display colors, we cannot guarantee that the
                            color you see accurately portrays the true color of the product.
                        </p>
                    </>
                )}
            </TabsContent>
            <TabsContent value="reviews" className="pt-4">
                <h1 className="text-2xl font-bold">Reviews</h1>
                <p className="text-gray-500">Review this product.</p>
            </TabsContent>
        </Tabs>
    );
};
