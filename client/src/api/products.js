import Axios from "../config/axios";
import { HOST } from "../config/variables";

export const getProducts = async () => {
    try {
        const response = await Axios.get(`${HOST}/products/get-all`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const addProducts = async (product_id, product_name, quantity, unit, price) => {
    try {
        const response = await Axios.post(`${HOST}/products/add-product`, { product_id, product_name, quantity, unit, price });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const editProduct = async (product_id, product_name, quantity, unit, price) => {
    try {
        const response = await Axios.put(`${HOST}/products/edit-product/${product_id}`, { product_name, quantity, unit, price });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};


export const deleteProduct = async (productId) => {
    try {
        const response = await Axios.delete(`${HOST}/products/delete-product/${productId}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting product:", error);
        throw error;
    }
};