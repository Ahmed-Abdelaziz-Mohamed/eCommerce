import { FC, useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import { CartContext } from "../../Context/CartContext";

interface FormValues {
    details: string;
    phone: string;
    city: string;
}

const Chekout: FC = () => {
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { cartId } = useParams();

    const { chekoutSession } = useContext<any>(CartContext);

    useEffect(() => {
        if (error) {
            setSuccess(null); // Clear success when there is an error
        }
    }, [error]);

    useEffect(() => {
        if (success) {
            setError(null); // Clear error when there is success
        }
    }, [success]);

    const validationSchema = Yup.object().shape({
        details: Yup.string()
            .min(3, "min chars are 5")
            .max(50, "max chars are 50")
            .required("Detais is required"),
        phone: Yup.string()
            .matches(
                /^01[0125][0-9]{8}$/,
                "The phone number must be a valid egyption number"
            )
            .required("Phone is required"),
        city: Yup.string()
            .min(3, "min chars are 3")
            .max(10, "max chars are 10")
            .required("City is required"),
    });

    const handleSubmit = async (formValues: FormValues) => {
        setIsLoading(true);
        try {
            const response = await chekoutSession(cartId, formValues);
            console.log(response.data.session.url);
            window.location.href = response.data.session.url;
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching cart items:", error);
            setIsLoading(false);
        }
    };

    const formik = useFormik({
        initialValues: {
            details: "",
            phone: "",
            city: "",
        },
        validationSchema,
        onSubmit: handleSubmit,
    });

    const isButtonDisabled =
        Object.keys(formik.errors).length > 0 ||
        !formik.values.details ||
        !formik.values.phone ||
        !formik.values.city;

    return (
        <>
            <div className="container max-w-screen-xl mx-auto my-6 py-6">
                <h2 className="font-semibold max-w-screen-xl mx-auto my-12 text-green-600">
                    Checkout
                </h2>
                <form
                    onSubmit={formik.handleSubmit}
                    className="max-w-screen-xl mt-8 mx-auto"
                >
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            value={formik.values.details}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            type="text"
                            name="details"
                            id="details"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                            placeholder=" "
                            required
                        />
                        <label
                            htmlFor="details"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Details
                        </label>
                    </div>
                    {formik.errors.details && formik.touched.details ? (
                        <div
                            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                            role="alert"
                        >
                            {formik.errors.details}
                        </div>
                    ) : null}
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            type="text"
                            name="phone"
                            id="phone"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                            placeholder=" "
                            required
                        />
                        <label
                            htmlFor="phone"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Phone
                        </label>
                    </div>
                    {formik.errors.phone && formik.touched.phone ? (
                        <div
                            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                            role="alert"
                        >
                            {formik.errors.phone}
                        </div>
                    ) : null}
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            value={formik.values.city}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            type="text"
                            name="city"
                            id="city"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                            placeholder=" "
                            required
                        />
                        <label
                            htmlFor="city"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            City
                        </label>
                    </div>
                    {formik.errors.city && formik.touched.city ? (
                        <div
                            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                            role="alert"
                        >
                            {formik.errors.city}
                        </div>
                    ) : null}

                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className={`text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 ${
                                isButtonDisabled
                                    ? "cursor-not-allowed opacity-50"
                                    : ""
                            }`}
                            disabled={isButtonDisabled}
                        >
                            {isLoading ? (
                                <i className="fas fa-spinner fa-spin"></i>
                            ) : (
                                "Pay"
                            )}
                        </button>
                    </div>
                    {error ? (
                        <div
                            className="p-4 my-8 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 text-center mx-auto"
                            role="alert"
                        >
                            {error}
                        </div>
                    ) : success ? (
                        <div
                            className="p-4 my-8 text-sm text-center text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 mx-auto"
                            role="alert"
                        >
                            {success}
                        </div>
                    ) : null}
                </form>
            </div>
        </>
    );
};
export default Chekout;
