import { Product } from "@/entities/product.entity";
import { getEM } from "@/lib/mikroORM";

export const getProductById = async (id: number) => {
    const em = getEM();
    const product = await em.findOne(Product, id, { populate: ["prices.currency", "categories", "reviews", "sizes.size"], orderBy: { prices: { startDate: "desc" } } });
  
    const formattedProduct = {
        ...product,
        sizes: product?.sizes.map((s) => {
            const res = {} as { [key: string]: any };

            Object.keys(s).forEach((key) => {
                if (key != "size" && key != 'product') {
                    res[key] = s[key as keyof typeof s];
                }
            });

            Object.keys(s.size).forEach((key) => {
                if (key != "id" && key !="productSizes") {
                    res[key] = s.size[key as keyof typeof s.size];
                }
            });
			return res;
        }),
    };
    return formattedProduct;
};

export const getProducts = async () => {
    const em = getEM();
    const products = await em.find(Product, {}, { populate: ["prices.currency", "categories", "reviews", "sizes.size"], orderBy: { prices: { startDate: "desc" } } });

    return products;
};
