import React, { FC } from "react";
import Slider from "react-slick";

import slide1 from "../../assets/imgs/main-slider-1.jpeg";
import slide2 from "../../assets/imgs/main-slider-2.jpeg";
import mainSlider1 from "../../assets/imgs/main-slider-3.jpeg";
import mainSlider2 from "../../assets/imgs/grocery-banner.png";
import mainSlider3 from "../../assets/imgs/slide-1.jpeg";
import mainSlider4 from "../../assets/imgs/slide-2.jpeg";

const MainSlider: FC = () => {
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
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    className: "slides",
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };
  return (
    <>
      <div className="row mb-12">
        <div className="w-3/4">
          <Slider {...settings}>
            <img src={mainSlider1} className="w-full h-[400px]" alt="" />
            <img src={mainSlider2} className="w-full h-[400px]" alt="" />
            <img src={mainSlider3} className="w-full h-[400px]" alt="" />
            <img src={mainSlider4} className="w-full h-[400px]" alt="" />
          </Slider>
        </div>
        <div className="w-1/4">
          <img src={slide2} className="w-full h-[200px]" alt="" />
          <img src={slide1} className="w-full h-[200px]" alt="" />
        </div>
      </div>
    </>
  );
};
export default MainSlider;
