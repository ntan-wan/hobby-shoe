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
            thumbnail: `https://loremflickr.com/320/240/shoes`,
            images: Array(3)
                .fill(null)
                .map(() => `https://loremflickr.com/708/708/shoes`),
            color: faker.color.human(),
			createdAt: new Date(),
			updatedAt: new Date(),
			rating: faker.number.int({ min: 1, max: 5 }),
        };
    }
}
