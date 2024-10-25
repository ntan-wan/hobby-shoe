export type Region = "US" | "EU";

export interface Category {
    id: number;
    name: string;
    description?: string;
}

/* PRICES */
export interface PriceInfo {
	value: number;
}
export interface ProductPrices {
	current: PriceInfo;
	previous: PriceInfo;
}

/* PRODUCT */
export interface Product {
    id: number;
    brand: string;
    color: string;
    currency: string;
    categories: Category[];
    description: string;
    images?: string[];
    name: string;
    sizes: { [key in Region]: { size: number; quantity: number }[] };
    thumbnail?: string;
	prices: ProductPrices;
	rating: number;
}

/* REVIEW */
export interface Review {
	id: number;
	rating: number;
	comment: string;
	userId: number;
	productId: number;
	createdAt: string;
	updatedAt: string;
}

export interface CartItem {
    id: number;
    price: number;
    subtotal: number;
    product: Product;
    size: number;
    region: string;
    quantity: number;
}
