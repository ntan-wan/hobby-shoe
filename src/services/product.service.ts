import { Product } from "@/entities/product.entity";
import { getEM } from "@/lib/mikroORM";

export const getProductById = async (id: number) => {
	const em = getEM();
	const product = await em.findOne(Product, id, {populate: ["prices.currency", "categories", "reviews"], orderBy: {"prices": {startDate: "desc"}}});
	return product;
}

export const getProducts = async () => {
	const em = getEM();
	const products = await em.find(Product, {}, { populate: ["prices.currency", "categories", "reviews"], orderBy: {'prices' : {startDate: 'desc'}} });
	return products;
}