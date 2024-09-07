import axios from "axios";
import { createContext, FC, ReactNode } from "react";

export interface WishListContextType {
    getLoggedUserWishlist: () => Promise<any>;
    addProductToWishList: (productId: string) => Promise<any>;
    removeProductFromWishlist: (productId: string) => Promise<any>;
}

export interface WishListContextProviderProps {
    children?: ReactNode;
}

const WishListContext = createContext<WishListContextType | undefined>(
    undefined
);

const WishListContextProvider: FC<WishListContextProviderProps> = (props) => {
    const headers = { token: localStorage.getItem("userToken") };

    const getLoggedUserWishlist = (): Promise<any> => {
        return axios
            .get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
                headers,
            })
            .then((response) => response)
            .catch((error) => {
                console.log(error);
            });
    };

    const addProductToWishList = (productId: string): Promise<any> => {
        return axios
            .post(
                `https://ecommerce.routemisr.com/api/v1/wishlist
`,
                { productId },
                { headers }
            )
            .then((response) => response)
            .catch((error) => {
                console.log(error);
            });
    };

    const removeProductFromWishlist = (productId: string): Promise<any> => {
        return axios
            .delete(
                `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
                {
                    headers,
                }
            )
            .then((response) => response)
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <>
            <WishListContext.Provider
                value={{
                    getLoggedUserWishlist,
                    addProductToWishList,
                    removeProductFromWishlist,
                }}
            >
                {props.children}
            </WishListContext.Provider>
        </>
    );
};

export { WishListContext, WishListContextProvider };
