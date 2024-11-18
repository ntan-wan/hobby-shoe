import type { EntityManager } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";
import { ProductFactory } from "@/factories/ProductFactory";
import { PriceFactory } from "@/factories/PriceFactory";
import { CurrencyFactory } from "@/factories/CurrencyFactory";
import { CategoryFactory } from "@/factories/CategoryFactory";
import { Category } from "@/entities/category.entity";
import { UserFactory } from "@/factories/userFactory";
import { ReviewFactory } from "@/factories/ReviewFactory";
import { ProductSizeFactory } from "@/factories/ProductSizeFactory";
import { SizeFactory } from "@/factories/SizeFactory";

export class DatabaseSeeder extends Seeder {
    async run(em: EntityManager): Promise<void> {
        const currency = new CurrencyFactory(em).createMalaysianRinggit();
        const categories = new CategoryFactory(em).make(4);
        const users = new UserFactory(em).make(10);

        const products = new ProductFactory(em)
            .each((product) => {
				const sizes = new SizeFactory(em).make(10);
				const availableSizes = [...sizes];
							
                product.categories.set(this.getRandomCategories(categories));

                const prices = new PriceFactory(em)
                    .each((price) => {
                        price.currency = currency;
                        price.product = product;
                    })
                    .make(2);

					const productSizes = new ProductSizeFactory(em)
                    .each((productSize) => {
						const size = availableSizes.splice(Math.floor(Math.random() * availableSizes.length), 1)[0];
                        productSize.product = product;
                        productSize.size = size;
                    })
                    .make(10);

                product.prices = prices;
                product.sizes.set(productSizes);
            })
            .make(100);

        new ReviewFactory(em)
            .each((review) => {
                review.user = this.getRandomElement(users);
                review.product = this.getRandomElement(products);
            })
            .make(100);
    }

    private getRandomElement<T>(array: T[]): T {
        return array[Math.floor(Math.random() * array.length)];
    }

    private getRandomCategories(categories: Category[]) {
        return categories.filter(() => Math.random() < 0.5); // Selects ~50% of categories randomly
    }
}
