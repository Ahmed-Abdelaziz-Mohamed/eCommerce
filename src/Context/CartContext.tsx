import axios from "axios";
import { createContext, FC, ReactNode, useState } from "react";

export interface CartContextType {
    cart: CartType | null;
    setCart: (cart: CartType | null) => void;
    getLoggedUserCart: () => Promise<any>;
    addProductToCart: (productId: string) => Promise<any>;
    updateCartItemCount: (productId: string, count: string) => Promise<any>;
    deleteProductItem: (productId: string) => Promise<any>;
    clearAllCart: () => Promise<any>;
    chekoutSession: (cartId: string, shippingAddress: string) => Promise<any>;
}

interface CartContextProviderProps {
    children?: ReactNode;
}
interface CartType {
    id: string;
    products: {
        productId: string;
        name: string;
        quantity: number;
        price: number;
    }[];
    totalPrice: number;
    itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CartContextProvider: FC<CartContextProviderProps> = (props) => {
    const [cart, setCart] = useState<CartType | null>(null);
    const token = localStorage.getItem("userToken");
    const headers = token ? { token } : {};

    const getLoggedUserCart = (): Promise<any> => {
        return axios
            .get(`https://ecommerce.routemisr.com/api/v1/cart`, {
                headers,
            })
            .then((response) => response)
            .catch((error) => {
                console.log(error);
                throw error;
            });
    };

    const addProductToCart = (productId: string): Promise<any> => {
        return axios
            .post(
                `https://ecommerce.routemisr.com/api/v1/cart`,
                { productId },
                { headers }
            )
            .then((response) => response)
            .catch((error) => {
                console.log(error);
                throw error;
            });
    };

    const updateCartItemCount = (
        productId: string,
        count: string
    ): Promise<any> => {
        return axios
            .put(
                `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
                { count },
                { headers }
            )
            .then((response) => response)
            .catch((error) => {
                console.log(error);
                throw error;
            });
    };

    const deleteProductItem = (productId: string): Promise<any> => {
        return axios
            .delete(
                `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
                {
                    headers,
                }
            )
            .then((response) => response)
            .catch((error) => {
                console.log(error);
                throw error;
            });
    };

    const clearAllCart = (): Promise<any> => {
        return axios
            .delete(`https://ecommerce.routemisr.com/api/v1/cart/`, {
                headers,
            })
            .then((response) => response)
            .catch((error) => {
                console.log(error);
                throw error;
            });
    };
    const chekoutSession = (
        cartId: string,
        shippingAddress: string
    ): Promise<any> => {
        return axios
            .post(
                `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173/`,
                { shippingAddress },
                {
                    headers,
                }
            )
            .then((response) => response)
            .catch((error) => {
                console.log(error);
                throw error;
            });
    };

    return (
        <>
            <CartContext.Provider
                value={{
                    cart,
                    setCart,
                    getLoggedUserCart,
                    addProductToCart,
                    updateCartItemCount,
                    deleteProductItem,
                    clearAllCart,
                    chekoutSession,
                }}
            >
                {props.children}
            </CartContext.Provider>
        </>
    );
};

export { CartContext, CartContextProvider };
