import { withORM } from "@/lib/mikroORM";
import { getProducts } from "@/services/product.service";

export const GET = withORM(async () => {
    try {
        const products = await getProducts();
        return new Response(JSON.stringify(products), { status: 200 });
    } catch (err) {
        console.error(err);
    }
});
