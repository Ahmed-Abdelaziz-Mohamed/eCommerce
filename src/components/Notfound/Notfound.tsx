import { FC } from "react";

const Notfound: FC = () => {
  return (
    <>
      <div className="container max-w-screen-xl mx-auto my-60 py-6 text-center">
        <h2 className="text-green-600 text-4xl">
          Error 404, The page you requested is not available
        </h2>
      </div>
    </>
  );
};
export default Notfound;
