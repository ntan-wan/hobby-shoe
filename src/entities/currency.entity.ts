import {Entity, Property, OneToMany, PrimaryKey} from "@mikro-orm/core";
import { Price } from "@/entities/price.entity";

@Entity({tableName: "currencies"})
export class Currency {
	@PrimaryKey()
	id!: number
	
	@Property()
	name!: string

	@Property()
	symbol!: string

	@Property()
	code!: string

	@Property()
	exchangeRate: number = 0.0

	@OneToMany(() => Price, price => price.currency)
	prices!: Price[]
}