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
                if (key != "size" && key != "product") {
                    res[key] = s[key as keyof typeof s];
                }
            });

            Object.keys(s.size).forEach((key) => {
                if (key != "id" && key != "productSizes") {
                    res[key] = s.size[key as keyof typeof s.size];
                }
            });
            return res;
        }),
    };
    return formattedProduct;
};

export const getProducts = async (page: number = 1, limit:  number = 10) => {
    const em = getEM();
    const [products, totalProducts] = await em.findAndCount(
        Product,
        {},
        {
            populate: ["prices.currency", "categories", "reviews", "sizes.size"],
            orderBy: { prices: { startDate: "desc" } },
            limit: Number(limit),
            // offset: (Number(page) - 1) * Number(limit),
        }
    );

    return {
		currentPage: page,
		// totalPages: Math.ceil(totalProducts / limit),
		products,
		totalProducts
	};
};
