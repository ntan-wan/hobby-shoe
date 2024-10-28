import { Entity, Property, PrimaryKey, OneToMany  } from "@mikro-orm/core";
import { Price } from "@/entities/price.entity";

@Entity({tableName: "products"})
export class Product {

	@PrimaryKey()
	id!: number;

	@Property()
	name!: string;

	@Property()
	brand!: string;

	@Property()
	thumbnail?: string;

	@Property()
	images?: string[];

	@Property()
	description?: string;

	@Property()
	color!: string;

	@Property({onCreate: () => new Date(), default: 'now()'})
	createdAt!:  Date;

	@Property({onCreate: () => new Date(), default: 'now()', onUpdate: () => new Date()})
	updatedAt!: Date;

	@OneToMany(() => Price, price => price.product)
	prices!: Price[];
}