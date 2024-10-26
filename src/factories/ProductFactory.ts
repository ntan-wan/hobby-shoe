import { Factory } from "@mikro-orm/seeder";
import { faker } from "@faker-js/faker";
import { Product } from "@/entities/product.entity";

export class ProductFactory extends Factory<Product> {
    model = Product;

    definition(): Partial<Product> {
        return {
			name: faker.commerce.productName(),
			brand: faker.company.name(),
			description: faker.commerce.productDescription(),
			thumbnail: faker.image.url(),
			images: [faker.image.url()],
			color: faker.color.human(),
        };
    }
}
