import axios from "@/lib/axios";

export const getProducts = async () => {
    try {
        const res = await axios.get("http://localhost:3001/products");
        return res;
    } catch (err) {
        console.error(err);
    }
};
