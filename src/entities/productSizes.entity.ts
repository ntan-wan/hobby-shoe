import { Entity, ManyToOne, PrimaryKey, Property, type Rel } from "@mikro-orm/core";
import { Product } from "@/entities/product.entity";
import { Size } from "@/entities/size.entity";

@Entity({tableName: 'product_sizes'})

export class ProductSizes {
	@PrimaryKey()
	id!: number

	@ManyToOne(() => Product)
	product!: Rel<Product>

	@ManyToOne(() => Size)
	size!: Rel<Size>

	@Property()
	quantity : number = 0
}