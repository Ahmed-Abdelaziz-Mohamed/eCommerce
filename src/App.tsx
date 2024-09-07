import { RouterProvider, createHashRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Cart from "./components/Cart/Cart";
import Wishlist from "./components/Wishlist/Wishlist";
import Products from "./components/Products/Products";
import Categories from "./components/Categories/Categories";
import Brands from "./components/Brands/Brands";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import ForgetPassword from "./components/ForgetPassword/ForgetPassword";
import Notfound from "./components/Notfound/Notfound";
import { UserContextProvider } from "./Context/UserContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import VerifyCode from "./components/VerifyCode/VerifyCode";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { CartContextProvider } from "./Context/CartContext";
import { Toaster } from "react-hot-toast";
import Checkout from "./components/Checkout/Checkout";
import { WishListContextProvider } from "./Context/WishListContext";

const query = new QueryClient({
    defaultOptions: {},
});

const routing = createHashRouter([
    {
        path: "/*",
        element: <Layout />,
        children: [
            {
                index: true,
                element: (
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                ),
            },
            {
                path: "cart",
                element: (
                    <ProtectedRoute>
                        <Cart />
                    </ProtectedRoute>
                ),
            },
            {
                path: "wishlist",
                element: (
                    <ProtectedRoute>
                        <Wishlist />
                    </ProtectedRoute>
                ),
            },
            {
                path: "products",
                element: (
                    <ProtectedRoute>
                        <Products />
                    </ProtectedRoute>
                ),
            },
            {
                path: "productdetails/:id",
                element: (
                    <ProtectedRoute>
                        <ProductDetails />
                    </ProtectedRoute>
                ),
            },
            {
                path: "categories",
                element: (
                    <ProtectedRoute>
                        <Categories />
                    </ProtectedRoute>
                ),
            },
            {
                path: "brands",
                element: (
                    <ProtectedRoute>
                        <Brands />
                    </ProtectedRoute>
                ),
            },
            {
                path: "checkout/:cartId",
                element: (
                    <ProtectedRoute>
                        <Checkout />
                    </ProtectedRoute>
                ),
            },
            { path: "login", element: <Login /> },
            { path: "register", element: <Register /> },
            { path: "forget-password", element: <ForgetPassword /> },
            { path: "verify-code", element: <VerifyCode /> },
            { path: "reset-password", element: <ResetPassword /> },
            { path: "*", element: <Notfound /> },
        ],
    },
]);

function App() {
    return (
        <QueryClientProvider client={query}>
            <WishListContextProvider>
                <UserContextProvider>
                    <CartContextProvider>
                        <RouterProvider router={routing}></RouterProvider>
                        <Toaster />
                    </CartContextProvider>
                </UserContextProvider>
                <ReactQueryDevtools />
            </WishListContextProvider>
        </QueryClientProvider>
    );
}

export default App;
