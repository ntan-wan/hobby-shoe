import { Entity, PrimaryKey, Property , ManyToOne} from "@mikro-orm/core";
import { Product } from "@/entities/product.entity";
import { type Rel } from "@mikro-orm/core";
import { Currency } from "./currency.entity";


@Entity({tableName: 'prices'})
export class Price {

	@PrimaryKey()
	id!: number;

	@Property({onCreate: () => new Date(), default: 'now()'})
	startDate!: Date;

	@Property()
	value!: number;

	@ManyToOne(() => Product)
	product!: Rel<Product>;

	@ManyToOne(() => Currency)
	currency!: Rel<Currency>;
}