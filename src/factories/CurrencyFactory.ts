import { Factory } from "@mikro-orm/seeder";
import { faker } from "@faker-js/faker";
import { Currency } from "@/entities/currency.entity";

export class CurrencyFactory extends Factory<Currency> {
    model = Currency;

    definition(): Partial<Currency> {
        return {
            name: faker.finance.currencyName(),
            symbol: faker.finance.currencySymbol(),
            code: faker.finance.currencyCode(),
            exchangeRate: faker.number.float({ min: 0, max: 100, fractionDigits: 2 }),
        };
    }
}
