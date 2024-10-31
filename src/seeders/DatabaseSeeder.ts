import type { EntityManager } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";
import { ProductFactory } from "@/factories/ProductFactory";
import { PriceFactory } from "@/factories/PriceFactory";
import { CurrencyFactory } from "@/factories/CurrencyFactory";
import { CategoryFactory } from "@/factories/CategoryFactory";
import { Category } from "@/entities/category.entity";
import { Currency } from "@/entities/currency.entity";
import { Product } from "@/entities/product.entity";

export class DatabaseSeeder extends Seeder {
    async run(em: EntityManager): Promise<void> {
        const currencies = new CurrencyFactory(em).make(5);
        const categories = new CategoryFactory(em).make(4);
        const products = new ProductFactory(em)
            .each((product) => {
                product.categories.set(this.getRandomCategories(categories));
            })
            .make(10);

		new PriceFactory(em)
			.each((price) => {
			price.currency = this.getRandomCurrency(currencies);
			price.product = this.getRandomProduct(products);
		}).make(20);

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
