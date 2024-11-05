import axios from "@/lib/axios";

export const getProducts = async (page : number = 1, limit : number = 10) => {
    return await axios.get(`/api/products?limit=${limit}&page=${page}`);
};