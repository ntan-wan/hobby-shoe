import { withORM } from "@/lib/mikroORM";
import { getProducts } from "@/services/product.service";
import { NextRequest } from "next/server";

export const GET = withORM(async (req: NextRequest) => {
    try {
		const {searchParams} = new URL(req.url);
		const limit = searchParams.get('limit');
		const page = searchParams.get('page');
        const products = await getProducts(Number(page) ?? 1 , Number(limit) ?? 10);
        return new Response(JSON.stringify(products), { status: 200 });
    } catch (err) {
        console.error(err);
    }
});
