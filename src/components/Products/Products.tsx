import { FC, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ScaleLoader } from "react-spinners";
import useProducts from "../../Hooks/useProducts";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import {
    WishListContext,
    WishListContextType,
} from "../../Context/WishListContext";

interface Product {
    id: string;
    imageCover: string;
    title: string;
    category: {
        name: string;
    };
    price: number | string;
    ratingsAverage: number | string;
}

const Products: FC = () => {
    const { data, isError, error, isLoading } = useProducts();
    const { addProductToWishList } = useContext(
        WishListContext
    ) as WishListContextType;
    const { addProductToCart } = useContext<any>(CartContext);

    const [spinningCart, setSpinningCart] = useState(false);
    const [spinningWishList, setSpinningWishList] = useState(false);
    const [currentProductId, setCurrentProductId] = useState("");
    const [searchTerm, setSearchTerm] = useState<string>("");

    const filteredProducts = data?.data?.data.filter((product: Product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const addProduct = async (productId: string) => {
        setSpinningCart(true);
        setCurrentProductId(productId);
        const response = await addProductToCart(productId);
        if (response.data.status === "success") {
            setSpinningCart(false);
            toast.success(response.data.message, {
                duration: 1500,
                position: "top-left",
            });
        } else {
            setSpinningCart(false);
            toast.error(response.data.message, {
                duration: 1500,
                position: "top-left",
            });
        }
        console.log(response);
    };

    const addProductToWashList = async (productId: string) => {
        setSpinningWishList(true);
        setCurrentProductId(productId);
        await addProductToWishList(productId)
            .then((item) => {
                setSpinningWishList(false);
                console.log(item);
                toast.success(item.data.message, {
                    duration: 1500,
                    position: "top-right",
                });
            })
            .catch((error) => {
                setSpinningWishList(false);
                toast.error(error.message, {
                    duration: 1500,
                    position: "top-right",
                });
            });
    };

    if (isLoading) {
        return (
            <>
                <div className="py-8 w-full flex justify-center">
                    <ScaleLoader color="green" />
                </div>
            </>
        );
    }
    if (isError) {
        return (
            <>
                <div className="py-8 w-full flex justify-center">
                    <h3>
                        {error instanceof Error
                            ? error.message
                            : "An unknown error occurred"}
                    </h3>
                </div>
            </>
        );
    }

    return (
        <>
            <div className="max-w-md mx-auto mt-12">
                <label
                    htmlFor="default-search"
                    className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                >
                    Search
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg
                            className="w-4 h-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                            />
                        </svg>
                    </div>
                    <input
                        onChange={(e) => setSearchTerm(e.target.value)}
                        type="search"
                        id="default-search"
                        className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-green-600 focus:border-green-600 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-600 dark:focus:border-green-600"
                        placeholder="Search products..."
                        required
                        value={searchTerm}
                    />
                    <button
                        type="submit"
                        className="text-white absolute end-2.5 bottom-2.5 bg-green-600 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-600 font-medium rounded-lg text-sm px-4 py-2 dark:bg-green-600 dark:hover:bg-green-600 dark:focus:ring-green-600"
                    >
                        Search
                    </button>
                </div>
            </div>
            <div className="flex flex-wrap px-4 py-8 items-stretch">
                {filteredProducts.map((product: Product) => (
                    <div
                        key={product.id}
                        className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 transition-shadow duration-700 ease-in-out hover:shadow-lg hover:shadow-green-600 hover:cursor-pointer my-4"
                    >
                        <div className="product leading-6">
                            <Link to={`/productdetails/${product.id}`}>
                                <img
                                    className="w-full"
                                    src={product.imageCover}
                                    alt={product.title}
                                />
                                <span className="block font-light text-green-600">
                                    {product.category.name}
                                </span>
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                                    {product.title
                                        .split(" ")
                                        .slice(0, 2)
                                        .join(" ")}
                                </h3>
                                <div className="flex justify-between items-center">
                                    <span>{product.price}EGP</span>
                                    <span>
                                        {product.ratingsAverage}
                                        <i className="fas fa-star text-yellow-400"></i>
                                    </span>
                                </div>
                            </Link>
                            <div className="flex justify-center items-center">
                                <button
                                    className="btn my-4"
                                    onClick={() => {
                                        addProduct(product.id);
                                    }}
                                >
                                    {currentProductId === product.id &&
                                    spinningCart ? (
                                        <i className="fas fa-spinner fa-spin"></i>
                                    ) : (
                                        "Add to Cart"
                                    )}
                                </button>
                                <span
                                    className="hover:cursor-pointer"
                                    onClick={() =>
                                        addProductToWashList(product.id)
                                    }
                                >
                                    {currentProductId === product.id &&
                                    spinningWishList ? (
                                        <i className="fas fa-spinner fa-spin"></i>
                                    ) : (
                                        <i className="fa-solid fa-heart text-2xl"></i>
                                    )}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};
export default Products;
