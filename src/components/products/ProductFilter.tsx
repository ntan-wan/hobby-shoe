import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";

export const ProductFilter = () => {
    const options = {
        gender: [
            { id: "men", label: "Men" },
            { id: "unisex", label: "Unisex" },
        ],
		brand: [
			{id: 'adidas', label: 'Adidas'},
			{id: 'crocs', label: 'Crocs'},
			{id: 'hoka', label: 'Hoka'}
		],
		shoes: [
			{id: 'basketball', label: 'Basketball shoes'},
			{id: 'casual', label: 'Casual shoes'},
			{id: 'running', label: 'Running shoes'}
		]
    };

    return (
        <div className="min-w-52 max-w-52">
            <Accordion type="single" collapsible>
                <AccordionItem value="gender">
                    <AccordionTrigger>Gender</AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-3">
                        {options.gender.map((option) => (
                            <div key={option.id} className="flex items-center gap-3">
                                <Checkbox id={option.id} />
                                <label htmlFor={option.id} className="cursor-pointer">
                                    {option.label}
                                </label>
                            </div>
                        ))}
                    </AccordionContent>
                </AccordionItem>
				
                <AccordionItem value="brand">
                    <AccordionTrigger>Brand</AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-3">
                        {options.brand.map((option) => (
                            <div key={option.id} className="flex items-center gap-3">
                                <Checkbox id={option.id} />
                                <label htmlFor={option.id} className="cursor-pointer">
                                    {option.label}
                                </label>
                            </div>
                        ))}
					</AccordionContent>
                </AccordionItem>

                <AccordionItem value="shoes">
                    <AccordionTrigger>Shoes</AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-3">
                        {options.shoes.map((option) => (
                            <div key={option.id} className="flex items-center gap-3">
                                <Checkbox id={option.id} />
                                <label htmlFor={option.id} className="cursor-pointer">
                                    {option.label}
                                </label>
                            </div>
                        ))}
					</AccordionContent>
                </AccordionItem>

                <AccordionItem value="accessories">
                    <AccordionTrigger>Accessories</AccordionTrigger>
                    <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
                </AccordionItem>
                <AccordionItem value="size">
                    <AccordionTrigger>Size</AccordionTrigger>
                    <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
                </AccordionItem>
                <AccordionItem value="color">
                    <AccordionTrigger>Color</AccordionTrigger>
                    <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
};
