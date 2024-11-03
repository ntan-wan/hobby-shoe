import { Factory } from "@mikro-orm/seeder";
import { faker } from "@faker-js/faker";
import { ProductSizes } from "@/entities/productSizes.entity";
import { Product } from "@/entities/product.entity";
import { Size } from "@/entities/size.entity";

export class ProductSizeFactory extends Factory<ProductSizes> {
    model = ProductSizes;

    definition(): Partial<ProductSizes> {
        return {
			product: new Product(),
			size: new Size(),
			quantity: faker.number.int({ min: 1, max: 100 }),
        };
    }
}
