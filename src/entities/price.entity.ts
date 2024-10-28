import { Entity, PrimaryKey, Property , ManyToOne} from "@mikro-orm/core";
import { Product } from "@/entities/product.entity";
import { type Rel } from "@mikro-orm/core";


@Entity({tableName: 'prices'})
export class Price {

	@PrimaryKey()
	id!: number;

	@Property({onCreate: () => new Date(), default: 'now()'})
	startDate!: Date;
	
	@Property({nullable: true})
	endDate: Date | null = null;

	@Property()
	value!: number;

	@ManyToOne(() => Product)
	product!: Rel<Product>;
}