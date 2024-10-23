import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { ProductCard } from "./ProductCard";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

interface ProductSuggesstionsProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof ProductSuggestionVariants> {

}

const ProductSuggestionVariants = cva(['c-box'])

export const ProductSuggestions = ({className, ...props} : ProductSuggesstionsProps) => {

	const product = {
		brand: 'NIKE',
		name: "Air Max 90 Easyon Kid's Pre School Shoes - White",
		category: 'kids',
		color: 'white',
		price: 329
	};

    return (
        <div className={cn(ProductSuggestionVariants(), className)} {...props}>
            <h1 className="font-bold text-2xl">You may also like</h1>
            <Carousel
                opts={{
                    align: "start",
                }}
                className="w-full">
                <CarouselContent>
                    {Array.from({ length: 5 }).map((_, index) => (
                        <CarouselItem key={index} className="w-full lg:basis-3/12">
                            <div className="p-1">
                             <ProductCard product={product}/> 
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious  className="left-[-12px]"/>
                <CarouselNext  className="right-[-12px]"/>
            </Carousel>
        </div>
    );
};
