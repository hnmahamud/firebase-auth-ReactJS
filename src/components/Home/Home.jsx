import React from "react";
import Lottie from "lottie-react";
import homePageAnimation from "../../assets/homePageAnimation.json";

const Home = () => {
  return (
    <div className="md:w-[80%] md:mx-auto text-center">
      <h3 className="text-3xl text-gray-600 font-extrabold mt-8">
        Firebase Authentication
      </h3>
      <div className="mt-8">
        <Lottie
          className="h-96"
          animationData={homePageAnimation}
          loop={true}
        />
        ;
      </div>
    </div>
  );
};

export default Home;
