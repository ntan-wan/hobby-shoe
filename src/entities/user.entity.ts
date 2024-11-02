import { Collection, Entity, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { Review } from "@/entities/review.entity";

@Entity({tableName: 'users'})
export class User {
	@PrimaryKey()
	id!: number

	@Property()
	username!: string

	@Property()
	email!: string

	@Property()
	password!: string

	@Property()
	role!: string

	@Property({onCreate: () => new Date(), default: 'now()'})
	createdAt!: Date

	@Property({onCreate: () => new Date(), default: 'now()', onUpdate: () => new Date()})
	updatedAt!: Date

	@OneToMany(() => Review, review => review.user)
	reviews?:  Collection<Review>
}