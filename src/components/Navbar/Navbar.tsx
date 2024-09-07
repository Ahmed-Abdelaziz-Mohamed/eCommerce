import { FC, useContext, useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { UserContext, UserContextType } from "../../Context/UserContext";
import { CartContext } from "../../Context/CartContext";

interface CartDetails {
    products: CartProduct[];
}
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

const Navbar: FC = () => {
    const context = useContext(UserContext);
    const { userLogin, setUserLogin } = context as UserContextType;
    const navigate = useNavigate();

    const { getLoggedUserCart } = useContext<any>(CartContext);
    const [cartDetails, setCartDetails] = useState<CartDetails | null>(null);

    const logOut = (): void => {
        localStorage.removeItem("userToken");
        setUserLogin("");
        navigate("/login");
    };

    const getCartItems = async () => {
        try {
            const response = await getLoggedUserCart();
            setCartDetails(response.data.data);
        } catch (error) {
            console.error("Error fetching cart items:", error);
        }
    };
    useEffect(() => {
        getCartItems();
    }, [cartDetails]);

    return (
        <>
            <nav className="bg-white translate-y-[-25px] border-gray-200 dark:bg-gray-900 z-50 fixed w-full">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <NavLink
                        to="/"
                        className="flex items-center space-x-3 rtl:space-x-reverse"
                    >
                        <FaShoppingCart className="text-4xl text-green-500" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                            Fresh Cart
                        </span>
                    </NavLink>
                    <button
                        data-collapse-toggle="navbar-default"
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-controls="navbar-default"
                        aria-expanded="false"
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg
                            className="w-5 h-5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 17 14"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M1 1h15M1 7h15M1 13h15"
                            />
                        </svg>
                    </button>
                    <div
                        className="hidden w-full md:block md:w-auto"
                        id="navbar-default"
                    >
                        <ul className="font-medium text-center md:text-sm lg:text-base flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-4 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            {userLogin !== "" ? (
                                <>
                                    <li>
                                        <Link
                                            to="/cart"
                                            className="me-8 relative"
                                        >
                                            <i className="fa-solid fa-cart-shopping text-green-600 text-3xl"></i>
                                            <span className="absolute text-white text-2xl -top-6 left-9">
                                                {cartDetails?.products.length}
                                            </span>
                                        </Link>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/"
                                            className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-500 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                                        >
                                            Home
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/cart"
                                            className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-500 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                                        >
                                            Cart
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/wishlist"
                                            className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-500 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                                        >
                                            Wishlist
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/products"
                                            className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-500 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                                        >
                                            Products
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/categories"
                                            className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-500 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                                        >
                                            Categories
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/brands"
                                            className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-500 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                                        >
                                            Brands
                                        </NavLink>
                                    </li>
                                    <li
                                        onClick={logOut}
                                        className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-500 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent mx-6 cursor-pointer"
                                    >
                                        Logout
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li>
                                        <NavLink
                                            to="/login"
                                            className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-500 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                                        >
                                            Login
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/register"
                                            className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-500 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                                        >
                                            Register
                                        </NavLink>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
};
export default Navbar;
