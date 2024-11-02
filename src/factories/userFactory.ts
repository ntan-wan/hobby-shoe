import { User } from "@/entities/user.entity";
import { Factory } from "@mikro-orm/seeder";
import { faker } from "@faker-js/faker";

export class UserFactory extends Factory<User> {
    model = User;

	private roles = ["admin", "user"];

    definition(): Partial<User> {
        return {
			username: faker.internet.userName(),
			email: faker.internet.email(),
			password: faker.internet.password(),
			role: faker.helpers.arrayElement(this.roles),
			createdAt: new Date(),
			updatedAt: new Date(),
        };
    }
}
