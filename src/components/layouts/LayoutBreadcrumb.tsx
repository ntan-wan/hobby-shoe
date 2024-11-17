import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { Fragment } from "react";

const LayoutBreadcrumbVariants = cva([]);

interface Link {
    href: string;
    label: string;
}
interface LayoutBreadcrumbProps extends React.HTMLAttributes<HTMLDivElement> {
    links?: Link[];
}
export const LayoutBreadcrumb = ({ className, links, ...props }: LayoutBreadcrumbProps) => {
    return (
        <Breadcrumb className={cn(LayoutBreadcrumbVariants(), className)} {...props}>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>

                {links &&
                    links.map((link, index) => (
                        <Fragment key={link.href}>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink className={cn(index == links.length - 1  && 'font-bold text-black')} href={link.href}>{link.label}</BreadcrumbLink>
                            </BreadcrumbItem>
                        </Fragment>
                    ))}
            </BreadcrumbList>
        </Breadcrumb>
    );
};
