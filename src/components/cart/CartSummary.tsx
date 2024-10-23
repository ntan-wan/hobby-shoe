import { forwardRef } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export const CartSummary = forwardRef(({ ...props }, ref) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl">Summary</CardTitle>
                <CardDescription>Overview of items, quantities, and total cost.</CardDescription>
            </CardHeader>
            <CardContent>
                {/* Subtotal */}
                <p className="flex items-center justify-between">
                    <span>Subtotal</span>
                    <span>MYR 1,000.00</span>
                </p>

                <Separator className="my-4" />

                <p className="flex items-center justify-between">
                    <span>Order Amount</span>
                    <span>MYR 1,000.00</span>
                </p>

                <Separator className="my-4" />

                {/* Discount */}
                <div className="w-full">
                    <label className="c-label">Input Discount Code</label>
                    <div className="flex">
                        <Input className="flex-[8] rounded-r-none" placeholder="Enter discount code" />
                        <Button className="flex-[4] rounded-l-none">Apply</Button>
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <Button className="w-full block">Checkout</Button>
            </CardFooter>
        </Card>
    );
});

CartSummary.displayName = "CartSummary";
