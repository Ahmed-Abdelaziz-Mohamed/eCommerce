import { FC } from "react";
import Products from "./../Products/Products";
import CategoriesSlider from "../CategoriesSlider/CategoriesSlider";
import MainSlider from "../MainSlider/MainSlider";

const Home: FC = () => {
  return (
    <>
      <div className="container max-w-screen-xl mx-auto my-6 py-6">
        <MainSlider />
        <CategoriesSlider />
        <Products />
      </div>
    </>
  );
};
export default Home;
