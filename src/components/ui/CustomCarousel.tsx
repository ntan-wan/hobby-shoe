"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { forwardRef, useState, useEffect } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";

interface ProductBoxProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof ProductBoxVariants> {
    imgUrl?: string;
}
const ProductBoxVariants = cva(["border border-gray-300 rounded-md relative w-20 h-20 cursor-pointer hover:border-gray-500"]);
const ProductBox = ({ imgUrl, className, children, ...props }: ProductBoxProps) => {
    return (
        <div className={cn(ProductBoxVariants(), className)} {...props}>
            {imgUrl && <Image fill src={imgUrl} alt="product image" className="w-full object-cover z-[-1]" sizes="(min-width: 1024px) 6vw , 100vw" />}
            {children}
        </div>
    );
};

interface CustomCarouselProps extends React.HTMLAttributes<HTMLDivElement> {
    urls: string[];
}
export const CustomCarousel = forwardRef<HTMLDivElement, CustomCarouselProps>(({ urls, className, ...props }, ref) => {
	/* STATES */
    const [api, setApi] = useState<CarouselApi>();
	const [selectedIndex, setSelectedIndex] = useState(0);

	/* HOOKS */
	useEffect(() => {
		if (api) {
			api.scrollTo(selectedIndex);
			api.on('select', () => {
				setSelectedIndex(api.selectedScrollSnap());
			});
		}
	}, [api ,selectedIndex]);

	/* METHODS */
    const handleSelectImg = (index: number) => {
        if (api) {
            api.scrollTo(index);
			setSelectedIndex(index);
        }
    };

    return (
        <div ref={ref} className={cn("flex gap-5 h-full", className)} {...props}>
            <div className="flex flex-col gap-4">
                {urls?.length ? (
                    urls.map((url, index) => (
                        <ProductBox className={cn(selectedIndex == index && "border-gray-500")} imgUrl={url} key={url+index} onClick={() => handleSelectImg(index)} />
                    ))
                ) : (
                    <ProductBox className={cn("flex items-center justify-center")}>
                        <p className="italic text-gray-500 text-center p-4 text-sm">No images</p>
                    </ProductBox>
                )}
            </div>

            <div className="w-full flex justify-center border border-gray-300 rounded-md">
                {urls?.length ? (
                    <Carousel className="max-w-2xl" opts={{ loop: true }} setApi={setApi} >
                        <CarouselContent>
                            {urls?.map((url, index) => (
                                <CarouselItem className="flex justify-center" key={url+index}>
                                    <div className="relative min-w-[708px] min-h-[708px]">
                                        <Image fill src={url} alt="product image" className="w-full object-cover" sizes="(min-width: 1024px) 50vw , 100vw" priority/>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                ) : (
                    <p className="flex items-center justify-center text-gray-500 italic">No images found.</p>
                )}
            </div>
        </div>
    );
});

CustomCarousel.displayName = "CustomCarousel";
