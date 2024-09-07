import React, { FC, useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";

interface Product {
    id: string;
    imageCover: string;
    image: string;
    name: string;
    title: string;
    category: {
        name: string;
        price: number | string;
        ratingsAverage: number | string;
    };
}

const CategoriesSlider: FC = () => {
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
        speed: 200,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
        className: "slides",
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
    };

    const [categories, setCategories] = useState<Product[]>([]);

    const getCategories = async () => {
        await axios
            .get(`https://ecommerce.routemisr.com/api/v1/categories`)
            .then(({ data }) => {
                setCategories(data.data);
            })
            .catch((error) => {
                console.log(error);
                throw error;
            });
    };
    useEffect(() => {
        getCategories();
    }, []);

    return (
        <>
            <div className="py-5">
                <Slider {...settings}>
                    {categories?.map((category: Product) => (
                        <div key={category.id}>
                            <img
                                src={category.image}
                                className="w-full h-[200px] object-cover md:object-contain"
                                alt={category.name}
                            />
                            <h5 className="text-center my-6">
                                {category.name}
                            </h5>
                        </div>
                    ))}
                </Slider>
            </div>
        </>
    );
};
export default CategoriesSlider;
