import { Truck } from "lucide-react"
import { cva, VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const bannerVariants = cva(["flex items-center gap-4 border border-gray-300 rounded-md p-3"], {
	variants: {
		variant: {
			default: ""
		}
	},
	defaultVariants: {
		variant: "default"
	}
})

interface BannerProps extends React.HTMLAttributes<HTMLDivElement> , VariantProps<typeof bannerVariants> {
	
}
export const FreeShippingBanner = ({className, ...props} : BannerProps) => {
	return (
		<div className={cn(bannerVariants(), className)} {...props}>
			<div><Truck size={32}/></div>
			<div>
				<p className="font-bold">Free Shipping Available.</p>
				<p>Checkout Now!</p>
			</div>
		</div>
	)
}