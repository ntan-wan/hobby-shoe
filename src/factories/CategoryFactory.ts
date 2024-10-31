import { Factory } from "@mikro-orm/seeder";
import { Product } from "@/entities/product.entity";
import { Category } from "@/entities/category.entity";

export class CategoryFactory extends Factory<Category> {
    model = Category;

    private shoeCategories: string[] = ["Athletic Shoes", "Casual Shoes", "Dress Shoes", "Boots", "Sandals", "Sneakers", "Running Shoes", "Loafers", "High Heels", "Flats"];
    private usedCategories = new Set<string>(); // Track used category names

    definition(): Partial<Category> {
        const availableCategories = this.shoeCategories.filter((name) => !this.usedCategories.has(name));
        const randomCategoryName = availableCategories[Math.floor(Math.random() * availableCategories.length)];

        this.usedCategories.add(randomCategoryName);

        return {
            name: randomCategoryName,
        };
    }

    //# Method to associate categories with products if needed.
    withProducts(products: Product[]) {
        return this.each((category) => {
            products.forEach((product) => {
                category.products.add(product);
            });
        });
    }
}
