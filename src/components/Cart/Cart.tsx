import { FC, useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import { ScaleLoader } from "react-spinners";
import { Link } from "react-router-dom";
import { CartContextType } from "./../../Context/CartContext";

// Define the structure of the product and cart details
interface Product {
    id: string;
    imageCover: string;
    title: string;
    price: string;
    ratingsAverage: string;
}

interface CartProduct {
    product: Product;
    count: number;
    price: string;
}

interface CartDetails {
    products: CartProduct[];
    _id: string;
    totalCartPrice: string;
}

const Cart: FC = () => {
    const {
        getLoggedUserCart,
        updateCartItemCount,
        deleteProductItem,
        clearAllCart,
    } = useContext<CartContextType | any>(CartContext);
    const [cartDetails, setCartDetails] = useState<CartDetails | null>(null);
    const [loading, setLoading] = useState(false);
    const [spinning, setSpinning] = useState(false);
    const [currentProductId, setCurrentProductId] = useState("");

    const getCartItems = async () => {
        setLoading(true);
        try {
            const response = await getLoggedUserCart();
            setCartDetails(response.data.data);
            console.log(response.data.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching cart items:", error);
            setLoading(false);
        }
    };
    const updateCartCount = async (productId: string, count: number) => {
        setSpinning(true);
        setCurrentProductId(productId);
        try {
            const response = await updateCartItemCount(productId, count);
            console.log(response.data.data);
            setCartDetails(response.data.data);
            setSpinning(false);
        } catch (error) {
            console.error("Error fetching cart items:", error);
            setSpinning(false);
        }
    };

    const deleteItem = async (productId: string) => {
        setLoading(true);
        try {
            const response = await deleteProductItem(productId);
            console.log(response.data.data);
            setCartDetails(response.data.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching cart items:", error);
            setLoading(false);
        }
    };

    const clearCart = async () => {
        setLoading(true);
        try {
            const response = await clearAllCart();
            console.log(response);
            setCartDetails(response.data.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching cart items:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        getCartItems();
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
            <div className="w-[82%] mx-auto relative overflow-x-auto sm:rounded-lg mt-12 pt-12">
                <div className="flex justify-between">
                    <h2 className="text-3xl text-green-600 my-2 text-center">
                        Shopping Cart
                    </h2>
                    <Link
                        to={`/checkout/${cartDetails?._id}`}
                        className=" bg-black px-8 py-4 rounded-md text-lg text-white"
                    >
                        Check Out <span className="text-yellow-600">$</span>
                    </Link>
                </div>
                <h4 className="my-4 flex justify-between">
                    <span className="bg-green-600 px-4 py-2 rounded-md text-white">
                        Total Cart Price: {cartDetails?.totalCartPrice} EGP
                    </span>
                    <span className="bg-green-600 px-4 py-2 rounded-md text-white">
                        Total Number of Items: {cartDetails?.products.length}
                    </span>
                </h4>
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
                                Qty
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Price
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartDetails?.products?.map(
                            ({ product, count, price }) => (
                                <tr
                                    key={product.id}
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 "
                                >
                                    <td className="p-4">
                                        <img
                                            src={product.imageCover}
                                            className="w-16 md:w-32 max-w-full max-h-full"
                                            alt={product.title}
                                        />
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                        {product.title}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <button
                                                onClick={() => {
                                                    updateCartCount(
                                                        product.id,
                                                        count - 1
                                                    );
                                                }}
                                                className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                                type="button"
                                            >
                                                {spinning &&
                                                currentProductId ===
                                                    product.id ? (
                                                    <i
                                                        aria-disabled
                                                        className="fas fa-spinner fa-spin"
                                                    ></i>
                                                ) : (
                                                    <span>
                                                        <span className="sr-only">
                                                            Decrease quantity
                                                        </span>
                                                        <svg
                                                            className="w-3 h-3"
                                                            aria-hidden="true"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 18 2"
                                                        >
                                                            <path
                                                                stroke="currentColor"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M1 1h16"
                                                            />
                                                        </svg>
                                                    </span>
                                                )}
                                            </button>
                                            <div>
                                                <span>{count}</span>
                                            </div>
                                            <button
                                                onClick={() => {
                                                    updateCartCount(
                                                        product.id,
                                                        count + 1
                                                    );
                                                }}
                                                className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                                type="button"
                                            >
                                                {spinning &&
                                                currentProductId ===
                                                    product.id ? (
                                                    <i
                                                        aria-disabled
                                                        className="fas fa-spinner fa-spin"
                                                    ></i>
                                                ) : (
                                                    <span>
                                                        <span className="sr-only">
                                                            Increase quantity
                                                        </span>
                                                        <svg
                                                            className="w-3 h-3"
                                                            aria-hidden="true"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 18 18"
                                                        >
                                                            <path
                                                                stroke="currentColor"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M9 1v16M1 9h16"
                                                            />
                                                        </svg>
                                                    </span>
                                                )}
                                            </button>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                        <span>{price} EGP</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            onClick={() => {
                                                deleteItem(product.id);
                                            }}
                                            className=" cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline"
                                        >
                                            Remove
                                        </span>
                                    </td>
                                </tr>
                            )
                        )}
                    </tbody>
                </table>
                <button
                    onClick={clearCart}
                    className="w-1/2 mx-auto text-cente text-3xl text-white bg-green-600 hover:bg-green-400 rounded-md my-8 px-2 py-4"
                >
                    Clear your Cart <i className="fa-solid fa-trash-can"></i>
                </button>
            </div>
        </>
    );
};

export default Cart;
