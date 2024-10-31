import { Factory } from "@mikro-orm/seeder";
import { faker } from "@faker-js/faker";
import { Price } from "@/entities/price.entity";
import { Product } from "@/entities/product.entity";

export class PriceFactory extends Factory<Price> {
    model = Price;

    definition(): Partial<Price> {
        return {
            startDate: faker.date.between({ from: "2020-01-01T00:00:00.000Z", to: "2021-01-01T00:00:00.000Z" }),
            value: faker.number.float({ min: 20, max: 100 }),
            product: new Product(),
        };
    }
}
