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
            thumbnail: "https://res.cloudinary.com/diueet8zq/image/upload/v1730678264/demo-product-3-thumbnail_jss6x0.png",
            images: [
                "https://res.cloudinary.com/diueet8zq/image/upload/v1730678265/demo-product-3-img-2_mjoi5y.png",
                "https://res.cloudinary.com/diueet8zq/image/upload/v1730678265/demo-product-3-img-4_olcbgk.png",
                "https://res.cloudinary.com/diueet8zq/image/upload/v1730678265/demo-product-3-img-3_tkszl1.png",
                "https://res.cloudinary.com/diueet8zq/image/upload/v1730678265/demo-product-3-img-1_kmgzha.png",
            ],
            color: faker.color.human(),
            createdAt: new Date(),
            updatedAt: new Date(),
            rating: faker.number.int({ min: 1, max: 5 }),
        };
    }
}
