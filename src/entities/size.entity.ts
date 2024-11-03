import { Entity, OneToMany, PrimaryKey, Property, Collection } from "@mikro-orm/core";
import { ProductSizes } from "@/entities/productSizes.entity";

@Entity({tableName: "sizes"})
export class Size {

	@PrimaryKey()
	id!: number;

	@Property()
	standard!: string;

	@Property()
	value!: number;

	@OneToMany(() => ProductSizes, (productSizes) => productSizes.size)
	productSizes = new Collection<ProductSizes>(this);
}