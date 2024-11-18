import { faker } from "@faker-js/faker";
import { Factory } from "@mikro-orm/seeder";
import { Currency } from "@/entities/currency.entity";

export class CurrencyFactory extends Factory<Currency> {
    model = Currency;

    definition(): Partial<Currency> {
		return this.getRandomCurrency();
    }

	getRandomCurrency() {
		return {
            name: faker.finance.currencyName(),
            symbol: faker.finance.currencySymbol(),
            code: faker.finance.currencyCode(),
            exchangeRate: faker.number.float({ min: 0, max: 100, fractionDigits: 2 }),
		}
	}

    createMalaysianRinggit() {
        return this.makeEntity({
            name: "Malaysian Ringgit",
            symbol: "RM",
            code: "MYR",
            exchangeRate: faker.number.float({ min: 0, max: 100, fractionDigits: 2 }),
        });
    }
}
