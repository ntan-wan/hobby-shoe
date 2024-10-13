"use client";

import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import { cva } from "class-variance-authority";

interface RatingProps extends React.HTMLAttributes<HTMLDivElement> {
    score?: number;
}

const ratingVariants = cva(["flex gap-1 items-center"]);

export const Rating = ({ score = 0, className, ...props }: RatingProps) => {
    return (
        <div className={cn(ratingVariants(), className)} {...props}>
            {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} size={20} fill={index < score ? "rgb(var(--color-highlight))" : "white"} style={{ color: "rgb(var(--color-highlight))" }} />
            ))}
        </div>
    );
};
