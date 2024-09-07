import { FC, useEffect, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate, NavigateFunction, Link } from "react-router-dom";
import * as Yup from "yup";

interface FormValues {
  resetCode: string;
}

const VerifyCode: FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate: NavigateFunction = useNavigate();

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
    resetCode: Yup.string().required("Reset Code is Required"),
  });

  const handleVerifingCode = async (formValues: FormValues) => {
    setIsLoading(true);
    await axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
        formValues
      )
      .then((response) => {
        setIsLoading(false);
        console.log(response.data.status);
        if (response.data.status === "Success") {
          setSuccess(response.data.status);
          navigate("/reset-password");
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error.response.data.message);
        setError(error.response.data.message);
      });
  };

  const formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema,
    onSubmit: handleVerifingCode,
  });

  const isButtonDisabled =
    Object.keys(formik.errors).length > 0 || !formik.values.resetCode;

  return (
    <>
      <form
        className="container max-w-screen-xl mx-auto my-6 py-6"
        onSubmit={formik.handleSubmit}
      >
        <h2 className="my-12">Please Enter Your Verification Code</h2>
        <div className="relative z-0 w-full mb-5 group">
          <input
            value={formik.values.resetCode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            name="resetCode"
            id="resetCode"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="resetCode"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Verify-Code
          </label>
        </div>
        {formik.errors.resetCode && formik.touched.resetCode ? (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {formik.errors.resetCode}
          </div>
        ) : null}
        <div className="flex flex-wrap justify-between">
          <button
            type="submit"
            className={`text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 ${
              isButtonDisabled ? "cursor-not-allowed opacity-50" : ""
            }`}
            disabled={isButtonDisabled}
          >
            {isLoading ? <i className="fas fa-spinner fa-spin"></i> : "Verify"}
          </button>
          <p className="font-bold">
            <Link to="/forget-password">Send Again?</Link>
          </p>
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
    </>
  );
};
export default VerifyCode;
