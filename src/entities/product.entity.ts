import { Entity, Property, PrimaryKey, OneToMany, ManyToMany, Collection } from "@mikro-orm/core";
import { Price } from "@/entities/price.entity";
import { Category } from "@/entities/category.entity";
import { Review } from "@/entities/review.entity";
import { ProductSizes } from "@/entities/productSizes.entity";

@Entity({ tableName: "products" })
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

	@Property({default: 0})
	rating!: number;

    @Property({ onCreate: () => new Date(), default: "now()" })
    createdAt!: Date;

    @Property({ onCreate: () => new Date(), default: "now()", onUpdate: () => new Date() })
    updatedAt!: Date;

    @OneToMany(() => Price, (price) => price.product)
    prices!: Price[];

	@OneToMany(() => Review, (review) => review.product)
	reviews?: Collection<Review>;

    @ManyToMany(() => Category, category => category.products, { owner: true })
    categories = new Collection<Category>(this);

	@OneToMany(() => ProductSizes, (productSizes) => productSizes.product)
	sizes = new Collection<ProductSizes>(this);
}
