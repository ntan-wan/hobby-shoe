import { Factory } from "@mikro-orm/seeder";
import { faker } from "@faker-js/faker";
import { Size } from "@/entities/size.entity";

export class SizeFactory extends Factory<Size> {
    model = Size;

	private standards = [
		"US",
		"EU",
		"UK",
		"JP",
	]

	private usedStandards = new Set<string>()

    definition(): Partial<Size> {
        return {
			value: faker.number.int({ min: 20, max: 50 }),
			standard: faker.helpers.arrayElement(this.standards),
        };
    }
}
