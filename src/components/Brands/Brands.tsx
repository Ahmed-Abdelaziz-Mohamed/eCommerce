import { FC, useEffect, useState } from "react";
import axios from "axios";

interface Brand {
    image: string;
    name: string;
    slug: string;
}

const Brands: FC = () => {
    const [brands, setBrands] = useState<Brand[]>([]);
    const [lightBoxSrc, setLightBoxSrc] = useState("");
    const [lightBoxText, setLightBoxText] = useState({ name: "", slug: "" });
    const [isLightBoxVisible, setIsLightBoxVisible] = useState(false);

    const getAllBrands = async () => {
        await axios
            .get(`https://ecommerce.routemisr.com/api/v1/brands`)
            .then((response) => {
                setBrands(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const displayLightBox = (brand: Brand) => {
        setLightBoxSrc(brand.image);
        setLightBoxText({ name: brand.name, slug: brand.slug });
        setIsLightBoxVisible(true);
    };

    const closeLightBox = () => {
        setIsLightBoxVisible(false);
    };

    const stopPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    };

    useEffect(() => {
        getAllBrands();
    }, []);

    return (
        <>
            <section className="portfolio mt-24 container mx-auto">
                <div>
                    <h2 className="mb-3 text-green-600 text-center text-xl sm:text-4xl">
                        All Brands
                    </h2>
                </div>
                <div className="flex flex-wrap justify-center items-center mb-12 text-center gap-4">
                    {brands.map((brand, index) => (
                        <div
                            key={index}
                            className="item w-full md:w-1/5 p-4 transition-shadow duration-700 ease-in-out hover:shadow-lg hover:shadow-green-600 hover:cursor-pointer border"
                            onClick={() => displayLightBox(brand)}
                        >
                            <div className="item-photo relative rounded-lg">
                                <img
                                    src={brand.image}
                                    className="w-full rounded-lg"
                                    alt={brand.name}
                                />
                                <div className="mt-2 text-center">
                                    <p>{brand.name}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {isLightBoxVisible && (
                    <div
                        className="fixed inset-0 z-[1100] flex justify-center items-center bg-[rgba(0,0,0,0.5)]"
                        onClick={closeLightBox}
                    >
                        <div
                            className="relative bg-white rounded-lg max-w-4xl w-[60%]"
                            onClick={stopPropagation}
                        >
                            {/* Modal Header */}
                            <div className="flex justify-between p-4 border-b">
                                <button
                                    className="text-gray-400 hover:text-gray-600"
                                    onClick={closeLightBox}
                                >
                                    <svg
                                        className="w-6 h-6"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 14 14"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                        />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>

                            {/* Modal Body */}
                            <div className="flex justify-around items-center">
                                <div className="">
                                    <h1 className="text-green-600 my-8">
                                        {lightBoxText.name}
                                    </h1>
                                    <p className="text-gray-700">
                                        {lightBoxText.slug}
                                    </p>
                                </div>
                                <div className="w-[50%]">
                                    <img
                                        src={lightBoxSrc}
                                        className="w-full object-cover"
                                        alt="Lightbox"
                                    />
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="p-4 border-t flex justify-end">
                                <button
                                    className="bg-slate-800 text-white px-4 py-2 rounded hover:bg-green-600"
                                    onClick={closeLightBox}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </section>
        </>
    );
};

export default Brands;
