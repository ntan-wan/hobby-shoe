import type { EntityManager } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";
import { ProductFactory } from "@/factories/ProductFactory";
import { PriceFactory } from "@/factories/PriceFactory";

export class DatabaseSeeder extends Seeder {
    async run(em: EntityManager): Promise<void> {
		new PriceFactory(em).each(price => {
			price.product = new ProductFactory(em).makeOne();
		}).make(10);

    }
}
