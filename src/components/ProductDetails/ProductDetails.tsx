import axios from "axios";
import React, { FC, useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import { ScaleLoader } from "react-spinners";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { CartContextType } from "./../../Context/CartContext";

interface Product {
    id: string | null | any;
    imageCover: string;
    images: string[];
    title: string;
    description: string;
    price: number | string;
    ratingsAverage: number | string;
}

const ProductDetails: FC = () => {
    const { addProductToCart } = useContext<CartContextType | any>(CartContext);

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

    const { id } = useParams<{ id: string }>();
    const [isLoading, setIsLoading] = useState(false);
    const [spinning, setSpinning] = useState(false);

    const PrevArrow: React.FC<{ onClick?: () => void }> = ({ onClick }) => {
        return (
            <button
                onClick={onClick}
                className="custom-arrow custom-prev"
                aria-label="Previous"
            >
                &lt;
            </button>
        );
    };

    // Custom Next Arrow
    const NextArrow: React.FC<{ onClick?: () => void }> = ({ onClick }) => {
        return (
            <button
                onClick={onClick}
                className="custom-arrow custom-next"
                aria-label="Next"
            >
                &gt;
            </button>
        );
    };

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        autoplay: false,
        autoplaySpeed: 0,
        className: "slides",
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
    };

    const [productInfo, setProductInfo] = useState<Product>();

    const getProductInfo = async (id: string | undefined) => {
        setIsLoading(true);
        await axios
            .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
            .then(({ data }) => {
                console.log(data.data);
                setProductInfo(data.data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        getProductInfo(id);
    }, []);
    return (
        <>
            {isLoading ? (
                <div className="py-8 w-full flex justify-center items-center h-screen">
                    <ScaleLoader color="green" />
                </div>
            ) : (
                <div className="flex flex-col justify-center items-center md:flex-row container max-w-screen-xl mx-auto my-6 py-6">
                    <div className="w-2/3 md:w-2/6">
                        <Slider {...settings}>
                            {productInfo?.images.map((src: any) => (
                                <img
                                    className="w-full"
                                    src={src}
                                    alt={productInfo?.title}
                                />
                            ))}
                        </Slider>
                    </div>
                    <div className="w-1/2 md:w-4/6 p-6">
                        <h1 className="text-2xl font-medium text-gray-950 mt-24">
                            {productInfo?.title}
                        </h1>
                        <p className="text-gray-600 mt-4 font-light">
                            {productInfo?.description}
                        </p>
                        <div className="flex justify-between items-center py-12">
                            <span className="bg-green-600 rounded-lg px-6 py-4 text-white">
                                {productInfo?.price} EGP
                            </span>
                            <span className="bg-green-600 rounded-lg px-6 py-4 text-white">
                                {productInfo?.ratingsAverage}{" "}
                                <i className="fas fa-star text-yellow-400"></i>
                            </span>
                        </div>
                        <button
                            className="btn my-12"
                            onClick={() => {
                                addProduct(productInfo?.id);
                            }}
                        >
                            {spinning ? (
                                <i className="fas fa-spinner fa-spin"></i>
                            ) : (
                                "Add to Cart"
                            )}
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};
export default ProductDetails;
