import { Product } from "@/entities/product.entity";
import { getEM } from "@/lib/mikroORM";
export const getProducts = async () => {
    const em = getEM();
    return await em.find(Product, {});
};

export const getProductById = async (id: number) => {
    const em = getEM();
	return await em.findOne(Product, { id });
}
export const getProductByIdWithPrices = async (id: number) => {
	const em = getEM();
	const product = await em.findOne(Product, id, {populate: ["prices.currency", "categories"], orderBy: {"prices": {startDate: "desc"}}});
	return product;
}

export const getProductWithPrices = async (id: number) => {
	const em = getEM();
	const product = await  em.findOne(Product, id, { populate: ["prices"] });
	return product;
}

export const getAllProductsWithPrices = async () => {
	const em = getEM();
	const products = await em.find(Product, {}, { populate: ["prices.currency", "categories"], orderBy: {'prices' : {startDate: 'desc'}} });
	return products;
}