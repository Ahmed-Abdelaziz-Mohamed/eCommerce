import { FC, useEffect, useState } from "react";
import axios from "axios";

interface Product {
    id: string;
    imageCover: string;
    title: string;
    image: string;
    name: string;
    category: {
        name: string;
        price: number | string;
        ratingsAverage: number | string;
    };
}

const Categories: FC = () => {
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
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {categories?.map((category, index) => (
                        <div
                            key={index}
                            className="relative overflow-hidden rounded-lg transition-shadow duration-700 ease-in-out hover:shadow-lg hover:shadow-green-600 hover:cursor-pointer my-4"
                        >
                            <img
                                src={category.image}
                                className="w-full h-96 object-cover"
                                alt={category.name}
                            />
                            <div className=" flex items-end justify-center p-4">
                                <h3 className="text-green-600">
                                    {category.name}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};
export default Categories;
