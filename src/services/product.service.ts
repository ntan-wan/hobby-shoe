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