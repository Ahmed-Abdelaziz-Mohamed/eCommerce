import { FC, useEffect, useState, useContext } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate, NavigateFunction, Link } from "react-router-dom";
import * as Yup from "yup";
import { UserContext, UserContextType } from "../../Context/UserContext";
interface FormValues {
  email: string;
  password: string;
}

const Login: FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const context = useContext(UserContext);
  const { setUserLogin } = context as UserContextType;

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

  const navigate: NavigateFunction = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("E-mail is invalid (example@gmail.com)")
      .required("E-mail is required"),
    password: Yup.string()
      .matches(
        /^[\w]{6,9}$/,
        `* Start with a letter (either uppercase or lowercase).
         * Be between 6 and 9 characters in total.
         * Can only contain letters (A-Z or a-z) and numbers (0-9)`
      )
      .required("Password is required"),
  });

  const handleLogin = async (formValues: FormValues) => {
    setIsLoading(true);
    await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, formValues)
      .then((response) => {
        if (response.data.message === "success") {
          localStorage.setItem("userToken", response.data.token);
          setUserLogin(response.data.token);
          setSuccess(response.data.message);
          navigate("/");
          console.log(response);
        }
      })
      .catch((error) => {
        if (axios.isAxiosError(error) && error.response) {
          setError(error.response.data.message);
        } else {
          setError(error);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleLogin,
  });

  const isButtonDisabled =
    Object.keys(formik.errors).length > 0 ||
    !formik.values.email ||
    !formik.values.password;
  return (
    <>
      <div className="container max-w-screen-xl mx-auto my-6 py-6">
        <h2 className="font-semibold max-w-screen-xl mx-auto my-12 text-green-600">
          Login
        </h2>
        <form
          onSubmit={formik.handleSubmit}
          className="max-w-screen-xl mt-8 mx-auto"
        >
          <div className="relative z-0 w-full mb-5 group">
            <input
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="email"
              name="email"
              id="email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              E-mail Address
            </label>
          </div>
          {formik.errors.email && formik.touched.email ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {formik.errors.email}
            </div>
          ) : null}
          <div className="relative z-0 w-full mb-5 group">
            <input
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="password"
              name="password"
              id="password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Password
            </label>
          </div>
          {formik.errors.password && formik.touched.password ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {formik.errors.password}
            </div>
          ) : null}

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className={`text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 ${
                isButtonDisabled ? "cursor-not-allowed opacity-50" : ""
              }`}
              disabled={isButtonDisabled}
            >
              {isLoading ? <i className="fas fa-spinner fa-spin"></i> : "Login"}
            </button>
            <p>
              &nbsp; Didn't have an account yet?{" "}
              <Link to={"/register"} className="font-semibold">
                Register Now
              </Link>
            </p>
            <p className="font-bold">
              <Link to="/forget-password">Forget Your Password?</Link>
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
      </div>
    </>
  );
};
export default Login;
