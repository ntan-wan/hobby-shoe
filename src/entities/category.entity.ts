import { Entity, ManyToMany, PrimaryKey, Property, Collection } from "@mikro-orm/core";
import { Product } from "@/entities/product.entity";

@Entity({tableName: 'categories'})
export class Category {

	@PrimaryKey()
	id!: number;

	@Property()
	name!: string;

	@ManyToMany(() => Product, product => product.categories,{mappedBy: 'categories'})
	// @ManyToMany({mappedBy: 'categories'})
	products = new Collection<Product>(this);
}