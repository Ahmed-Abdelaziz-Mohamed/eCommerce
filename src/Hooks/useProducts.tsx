import axios from "axios";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

interface ProductsResponse {
    data: any;
}

const useProducts = (): UseQueryResult<ProductsResponse, Error> => {
    const getProducts = () => {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
    };

    const responseObject = useQuery({
        queryKey: ["products"],
        queryFn: getProducts,
        staleTime: 20000,
        retry: Infinity,
    });

    return responseObject;
};

export default useProducts;
