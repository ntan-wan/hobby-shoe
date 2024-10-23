"use client";

import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface CustomQuantitySelectorProps extends React.InputHTMLAttributes<HTMLInputElement> {
    onIncrement?: (quantity: number) => void;
    onDecrement?: (quantity: number) => void;
}

export const CustomQuantitySelector = ({ onIncrement = (quantity) => {}, onDecrement = (quanitty) => {}, className, ...props }: CustomQuantitySelectorProps) => {
    const [quantity, setQuantity] = useState(1);

    const handleIncrement = () => {
        const newQuantity = quantity + 1;
        setQuantity((prev) => prev + 1);
        onIncrement(newQuantity);
    };
    const handleDecrement = () => {
        const newQuantity = quantity - 1;
        setQuantity((prev) => prev - 1);
        onDecrement(newQuantity);
    };

    return (
        <div className={cn("flex items-center h-[30px] w-[160px]", className)}>
            <Button className="rounded-r-none h-full" onClick={handleIncrement}>
                <Plus size={16} />
            </Button>
            <Input
                onChange={(e) => setQuantity(Number(e.target.value))}
                type="number"
                value={quantity}
                className="c-inputnumber text-center rounded-l-none rounded-r-none h-full"
            />
            <Button className="rounded-l-none h-full" onClick={handleDecrement}>
                <Minus size={16} />
            </Button>
        </div>
    );
};
