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

interface Size {
	id: number;
	standard: string;
	value: number;
	quantity: number;
}

/* PRODUCT */
export interface Product {
    id: number;
    brand: string;
    color: string;
    categories: Category[];
    description: string;
    images?: string[];
    name: string;
	sizes: Size[],
    thumbnail?: string;
	prices: Price[];
	rating: number;
}

export interface ProductsData {
	products: Product[];
	totalProducts: number;
	totalPages: number;
	currentPage: number;
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
	product: Product;
    size: number;
    standard: string;
    quantity: number;
}
