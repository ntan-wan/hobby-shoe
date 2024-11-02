import type { EntityManager } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";
import { ProductFactory } from "@/factories/ProductFactory";
import { PriceFactory } from "@/factories/PriceFactory";
import { CurrencyFactory } from "@/factories/CurrencyFactory";
import { CategoryFactory } from "@/factories/CategoryFactory";
import { Category } from "@/entities/category.entity";
import { Currency } from "@/entities/currency.entity";
import { Product } from "@/entities/product.entity";
import { User } from "@/entities/user.entity";
import { Review } from "@/entities/review.entity";
import { UserFactory } from "@/factories/userFactory";
import { ReviewFactory } from "@/factories/ReviewFactory";

export class DatabaseSeeder extends Seeder {
    async run(em: EntityManager): Promise<void> {
        const currencies = new CurrencyFactory(em).make(5);
        const categories = new CategoryFactory(em).make(4);
		const users = new UserFactory(em).make(10);

        const products = new ProductFactory(em)
            .each((product) => {
                product.categories.set(this.getRandomCategories(categories));
            })
            .make(10);
		
		new ReviewFactory(em).each((review) => {
			review.user = this.getRandomUser(users);
			review.product = this.getRandomProduct(products);
		}).make(20);

		new PriceFactory(em)
			.each((price) => {
			price.currency = this.getRandomCurrency(currencies);
			price.product = this.getRandomProduct(products);
		}).make(20);

    }

	private getRandomReviews(reviews : Review[]) {
		return reviews[Math.floor(Math.random()) * reviews.length];
	}

	private getRandomUser(users: User[]) {
		return users[Math.floor(Math.random() * users.length)];
	}

    private getRandomCurrency(currencies: Currency[]) {
        return currencies[Math.floor(Math.random() * currencies.length)];
    }

	private getRandomProduct(products: Product[]) {
		return products[Math.floor(Math.random() * products.length)];
	}

    private getRandomCategories(categories: Category[]) {
        return categories.filter(() => Math.random() < 0.5); // Selects ~50% of categories randomly
    }
}
