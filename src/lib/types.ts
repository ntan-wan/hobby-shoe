export type Region = "US" | "EU";

export interface Category {
    id: number;
    name: string;
    description?: string;
}

/* CURRENCY */
export interface Currency {
	id: number;
	name: string;
	symbol: string;
	code: string;
	exchangeRate: number;
}

/* PRICES */
interface Price {
	id: number;
	startDate: string;
	value: number;
	currency: Currency;
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
	prices: Price[];
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
