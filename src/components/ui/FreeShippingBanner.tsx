import { Truck } from "lucide-react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const bannerVariants = cva(["flex items-center gap-4 border border-gray-300 rounded-md p-3"], {
	variants: {
		variant: {
			default: "text-primary"
		}
	},
	defaultVariants: {
		variant: "default"
	}
})

export const FreeShippingBanner = ({className, ...props}) => {
	return (
		<div className={cn(bannerVariants(), className)}>
			<div><Truck size={32}/></div>
			<div>
				<p className="font-bold">Free Shipping Available.</p>
				<p>Checkout Now!</p>
			</div>
		</div>
	)
}