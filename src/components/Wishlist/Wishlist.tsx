import { FC, useContext, useEffect, useState } from "react";
import { ScaleLoader } from "react-spinners";
import {
    WishListContext,
    WishListContextType,
} from "../../Context/WishListContext";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { CartContextType } from "./../../Context/CartContext";

const Wishlist: FC = () => {
    const { addProductToCart } = useContext<CartContextType | any>(CartContext);
    const [spinning, setSpinning] = useState(false);
    const addProduct = async (productId: string) => {
        setSpinning(true);
        const response = await addProductToCart(productId);
        if (response.data.status === "success") {
            setSpinning(false);
            toast.success(response.data.message, {
                duration: 1500,
                position: "top-left",
            });
        } else {
            setSpinning(false);
            toast.error(response.data.message, {
                duration: 1500,
                position: "top-left",
            });
        }
        console.log(response);
    };
    const { getLoggedUserWishlist, removeProductFromWishlist } = useContext(
        WishListContext
    ) as WishListContextType;

    const [wishListDetails, setWishListDetails] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const getWishlistItems = async () => {
        setLoading(true);
        try {
            const response: any = await getLoggedUserWishlist();
            setWishListDetails(response?.data?.data);
            console.log(response?.data?.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching wishlist items:", error);
            setLoading(false);
        }
    };
    const removeItemFromWishList = async (productId: string) => {
        setLoading(true);
        try {
            await removeProductFromWishlist(productId);
            const response: any = getWishlistItems();
            console.log(response?.data?.data);
            setWishListDetails(response?.data?.data);
            console.log(wishListDetails);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching wishlist items:", error);
            setLoading(false);
        }
    };
    useEffect(() => {
        getWishlistItems();
    }, []);

    if (loading) {
        return (
            <>
                <div className="py-8 w-full flex justify-center mt-52">
                    <ScaleLoader color="green" />
                </div>
            </>
        );
    }

    return (
        <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg container max-w-screen-xl mx-auto my-8 py-6">
                <h2 className="mb-4">My WishList</h2>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-16 py-3">
                                <span className="sr-only">Image</span>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Product
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Price
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Remove
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Cart Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {wishListDetails?.map((product: any) => (
                            <tr
                                key={product?._id}
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                            >
                                <td className="p-4">
                                    <img
                                        src={product?.imageCover}
                                        className="w-16 md:w-32 max-w-full max-h-full"
                                        alt={product?.category?.image}
                                    />
                                </td>
                                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                    {product?.title}
                                </td>
                                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                    {product?.price}
                                </td>
                                <td className="px-6 py-4">
                                    <button
                                        className="font-medium text-red-600 dark:text-red-500 hover:underline"
                                        onClick={() => {
                                            removeItemFromWishList(
                                                product?._id
                                            );
                                        }}
                                    >
                                        Remove
                                    </button>
                                </td>
                                <td className="px-6 py-4">
                                    <button
                                        className="btn my-12"
                                        onClick={() => {
                                            addProduct(product?._id);
                                        }}
                                    >
                                        {spinning ? (
                                            <i className="fas fa-spinner fa-spin"></i>
                                        ) : (
                                            "Add to Cart"
                                        )}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};
export default Wishlist;
