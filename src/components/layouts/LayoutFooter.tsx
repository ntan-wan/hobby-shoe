import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface LayoutFooterProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof footerVariants> {}

const footerVariants = cva(["p-8"] , {
	variants: {
		variant: {
			'default': 'bg-black text-white'
		}
	},

	defaultVariants: {
		variant: 'default'
	},

});

export const LayoutFooter = ({ className, ...props }: LayoutFooterProps) => {
    const about = [
        { id: "aboutUs", label: "About Us" },
        { id: "termsAndConditions", label: "Terms and Conditions" },
        { id: "promotionTermsAndConditions", label: "Promotion Terms and Conditions" },
        { id: "privacyPolicy", label: "Privacy Policy" },
    ];

    const customerService = [
        { id: "faq", label: "FAQ" },
        { id: "returnPolicy", label: "Return Policy" },
        { id: "contactUs", label: "Contact Us" },
    ];

    const links = [
        { id: "menShoes", label: "Men's Shoes" },
        { id: "womenShoes", label: "Women's Shoes" },
        { id: "menCasual", label: "Men's Shoes" },
        { id: "kidsAllShoes", label: "Kids' All Shoes" },
        { id: "allClothing", label: "All Clothing" },
        { id: "allAccessories", label: "All Accessories" },
    ];
    return (
        <footer className={cn(footerVariants(), className)} {...props}>
            <div className="flex flex-wrap -m-2">
                <div className="p-2 w-full lg:w-3/12">
                    <ul className="c-footer-container-item">
                        <li className="c-footer-label">ABOUT</li>
                        {about.map((item) => (
                            <li className="c-footer-item" key={item.id}>{item.label}</li>
                        ))}
                    </ul>
                </div>

                <div className="p-2 w-full lg:w-3/12">
                    <ul className="c-footer-container-item">
                        <li className="c-footer-label">CUSTOMER SERVICES</li>
                        {customerService.map((item) => (
                            <li className="c-footer-item" key={item.id}>{item.label}</li>
                        ))}
                    </ul>
                </div>

                <div className="p-2 w-full lg:w-3/12">
                    <ul className="c-footer-container-item">
                        <li className="c-footer-label">POPULAR LINKS</li>
                        {links.map((item) => (
                            <li className="c-footer-item" key={item.id}>{item.label}</li>
                        ))}
                    </ul>
                </div>

                <div className="p-2 w-full lg:w-3/12">
                    <div className="flex gap-2">
                        <Input placeholder="Enter your email address" />
                        <Button>Sign up</Button>
                    </div>
                </div>
            </div>
            <div className="mt-16 text-center">
				<p className="text-sm">Malaysia | MYR</p>
				<p className="mt-4">COPYRIGHT &copy; 2024 SHOES.MY ALL RIGHT RESERVED</p>
			</div>
        </footer>
    );
};
