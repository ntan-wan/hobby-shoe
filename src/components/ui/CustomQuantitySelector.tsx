"use client";

import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface CustomQuantitySelectorProps extends React.InputHTMLAttributes<HTMLInputElement> {
    onIncrement?: (quantity: number) => void;
    onDecrement?: (quantity: number) => void;
	value?: number
}

export const CustomQuantitySelector = ({ onIncrement, onDecrement, className, value = 1 ,...props }: CustomQuantitySelectorProps) => {
    const [quantity, setQuantity] = useState(1);

	useEffect(() => {
		setQuantity(value);
	}, [value]);

    const handleIncrement = () => {
        const newQuantity = quantity + 1;
        setQuantity((prev) => prev + 1);
        onIncrement?.(newQuantity);
    };
    const handleDecrement = () => {
        const newQuantity = quantity - 1;
        setQuantity((prev) => {
			if (prev <= 1) return 1;
			return prev - 1;
		});
        onDecrement?.(newQuantity);
    };

    return (
        <div className={cn("flex items-center h-[30px] w-[160px]", className)} {...props}>
            <Button className="rounded-r-none h-full" onClick={handleDecrement}>
                <Minus size={16} />
            </Button>
            <Input
                onChange={(e) => setQuantity(Number(e.target.value))}
                type="number"
                value={quantity}
                className="c-inputnumber text-center rounded-l-none rounded-r-none h-full"
            />
            <Button className="rounded-l-none h-full" onClick={handleIncrement}>
                <Plus size={16} />
            </Button>
        </div>
    );
};
