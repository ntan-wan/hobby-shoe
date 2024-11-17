import { Factory } from "@mikro-orm/seeder";
import { faker } from "@faker-js/faker";
import { Product } from "@/entities/product.entity";

export class ProductFactory extends Factory<Product> {
    model = Product;

    definition(): Partial<Product> {
		const dummyImgs = this.getRandomImgs();
	
        return {
            name: faker.commerce.productName(),
            brand: faker.company.name(),
            description: faker.commerce.productDescription(),
            images: dummyImgs,
            thumbnail:dummyImgs[0],
            color: faker.color.human(),
            createdAt: new Date(),
            updatedAt: new Date(),
            rating: faker.number.int({ min: 1, max: 5 }),
        };
    }

	getRandomImgs() : string[] {
		const dummy1 = [
			'https://res.cloudinary.com/diueet8zq/image/upload/v1731831435/demo-product-5-img-1_bwquuc.png',
			'https://res.cloudinary.com/diueet8zq/image/upload/v1731831435/demo-product-5-img-2_syox50.png',
			'https://res.cloudinary.com/diueet8zq/image/upload/v1731831436/demo-product-5-img-5_eo8amd.png',
			'https://res.cloudinary.com/diueet8zq/image/upload/v1731831436/demo-product-5-img-4_gmggdb.png',
			'https://res.cloudinary.com/diueet8zq/image/upload/v1731831435/demo-product-5-img-3_o5nluk.png'
		];
		const dummy2 = [
			'https://res.cloudinary.com/diueet8zq/image/upload/v1731831423/demo-product-7-img-1_k1utyj.png',
			'https://res.cloudinary.com/diueet8zq/image/upload/v1731831423/demo-product-7-img-2_goh4yq.png',
			'https://res.cloudinary.com/diueet8zq/image/upload/v1731831424/demo-product-7-img-3_bdyqpp.png',
			'https://res.cloudinary.com/diueet8zq/image/upload/v1731831424/demo-product-7-img-5_raccie.png',
			'https://res.cloudinary.com/diueet8zq/image/upload/v1731831424/demo-product-7-img-4_yhalbk.png',
			'https://res.cloudinary.com/diueet8zq/image/upload/v1731831424/demo-product-7-img-6_wgsmfx.png',
		]
		const dummy3 = [
			'https://res.cloudinary.com/diueet8zq/image/upload/v1731831393/demo-product-6-img-1_at46mw.png',
			'https://res.cloudinary.com/diueet8zq/image/upload/v1731831393/demo-product-6-img-3_k0uouc.png',
			'https://res.cloudinary.com/diueet8zq/image/upload/v1731831393/demo-product-6-img-2_n54wrk.png',
			'https://res.cloudinary.com/diueet8zq/image/upload/v1731831393/demo-product-6-img-4_jjls4y.png',
			'https://res.cloudinary.com/diueet8zq/image/upload/v1731831394/demo-product-6-img-5_xypgme.png',
			'https://res.cloudinary.com/diueet8zq/image/upload/v1731831393/demo-product-6-img-6_sf9hn8.png',
		]
		const dummy4 = [
            "https://res.cloudinary.com/diueet8zq/image/upload/v1730678265/demo-product-3-img-2_mjoi5y.png",
            "https://res.cloudinary.com/diueet8zq/image/upload/v1730678265/demo-product-3-img-4_olcbgk.png",
            "https://res.cloudinary.com/diueet8zq/image/upload/v1730678265/demo-product-3-img-3_tkszl1.png",
            "https://res.cloudinary.com/diueet8zq/image/upload/v1730678265/demo-product-3-img-1_kmgzha.png",
		]

		return faker.helpers.arrayElement([dummy1, dummy2, dummy3, dummy4]);
	}
}
