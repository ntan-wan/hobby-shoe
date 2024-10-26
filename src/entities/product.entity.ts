import { Entity, Property, PrimaryKey  } from "@mikro-orm/core";

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

	@Property({})
	color!: string;
}