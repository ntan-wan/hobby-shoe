import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { Input } from "@/components/ui/input";
import { Search} from "lucide-react";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { CartPreview } from "../cart/CartPreview";
import Link from "next/link";

interface LayoutNavbarProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof navbarVariants> {}
interface MenuItems {
    id?: string;
    label: string;
    children?: MenuItems[];
}

const navbarVariants = cva(["flex items-center justify-between p-4 px-10 border-b border-b-slate-300 bg-white w-full"], {
    variants: {
        variant: {
            default: "",
        },
    },
    defaultVariants: {
        variant: "default",
    },
});

export const LayoutNavbar = forwardRef<HTMLDivElement, LayoutNavbarProps>(({ className, ...props }, ref) => {
    const menuItems = [
        { id: "1", label: "New Arrivals", children: [] },
        { id: "2", label: "Exclusives", children: [] },
        { id: "3", label: "Men", children: [] },
        { id: "4", label: "Women", children: [] },
        { id: "5", label: "Kids", children: [] },
        { id: "6", label: "Releases", children: [] },
        { id: "7", label: "Brands", children: [] },
        { id: "8", label: "SALE", children: [] },
    ];

    const render = (label: string, children: MenuItems[]) => {
        if (children?.length) {
            return children.map((item, index) => <NavigationMenuLink key={index}>{item.label}</NavigationMenuLink>);
        }
    };

    return (
        <nav ref={ref} className={cn(navbarVariants(), className)} {...props}>
            <div><Link href="/products" className="c-brand">BRAND</Link> </div>

            <div>
                <NavigationMenu>
                    <NavigationMenuList>
                        {menuItems.map((item) => (
                            <NavigationMenuItem key={item.id}>
                                <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
                                <NavigationMenuContent className={cn(item.children?.length ? 'p-3' : '')}>{render(item.label, item.children)}</NavigationMenuContent>
                            </NavigationMenuItem>
                        ))}
                    </NavigationMenuList>
                </NavigationMenu>
            </div>

            <div className="flex items-center gap-4">
				<div className="relative">
					<Input placeholder="Search..." type="text" className="w-44 pl-8"/>
					<Search size={16}  className="absolute left-[8px] top-[10px]"/>
				</div>
				<CartPreview />
			</div>
        </nav>
    );
});

LayoutNavbar.displayName = "LayoutNavbar";
