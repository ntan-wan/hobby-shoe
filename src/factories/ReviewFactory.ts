import { Review } from "@/entities/review.entity";
import { Factory } from "@mikro-orm/seeder";
import { faker } from "@faker-js/faker";

export class ReviewFactory extends Factory<Review> {
    model = Review;

    definition(): Partial<Review> {
		return {
            comment: faker.lorem.paragraph({ min: 1, max: 3 }),
			rating: faker.number.int({ min: 1, max: 5 }),
            createdAt: new Date(),
            updatedAt: new Date(),
        };
	}
}
