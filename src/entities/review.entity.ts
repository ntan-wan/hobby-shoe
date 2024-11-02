import { Entity, PrimaryKey, Property,type Rel, ManyToOne } from "@mikro-orm/core";
import { Product } from "@/entities/product.entity";
import {User} from '@/entities/user.entity'

@Entity({tableName: 'reviews'})
export class Review {
	@PrimaryKey()
	id!: number

	@Property()
	comment!: string

	@Property()
	rating!: number	

	@Property({onCreate: () => new Date(), default: 'now()'})
	createdAt!: Date

	@Property({onCreate: () => new Date(), default: 'now()', onUpdate: () => new Date()})
	updatedAt!: Date

	@ManyToOne(() => Product)
	product!: Rel<Product>

	@ManyToOne(() => User)
	user!: Rel<User>
}