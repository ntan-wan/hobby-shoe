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
        const currencies = new CurrencyFactory(em).make(5);
        const categories = new CategoryFactory(em).make(4);
		const users = new UserFactory(em).make(10);
		const sizes = new SizeFactory(em).make(20);

        const products = new ProductFactory(em)
            .each((product) => {
                product.categories.set(this.getRandomCategories(categories));
            })
            .make(10);

		new ProductSizeFactory(em).each((productSize) => {
			productSize.product = this.getRandomElement(products);
			productSize.size = this.getRandomElement(sizes);
		}).make(40);
		
		new ReviewFactory(em).each((review) => {
			review.user = this.getRandomElement(users);
			review.product = this.getRandomElement(products);
		}).make(100);

		new PriceFactory(em)
			.each((price) => {
			price.currency = this.getRandomElement(currencies);
			price.product = this.getRandomElement(products);
		}).make(20);

    }

	private getRandomElement<T>(array: T[]) : T {
		return array[Math.floor(Math.random() * array.length)];
	}

    private getRandomCategories(categories: Category[]) {
        return categories.filter(() => Math.random() < 0.5); // Selects ~50% of categories randomly
    }
}
