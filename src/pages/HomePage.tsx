import { Spinner } from "react-bootstrap";
import CarouselComponent from "../components/CarouselComponent";
import ProductComponents from "../components/ProductComponents";
import Testmonial from "../components/Testmonial";
import { useGetProductsQuery } from "../redux/features/product/productApi";
import { TProduct } from "../redux/features/product/productSlice";

type ProductImages = Pick<TProduct, "images">;

const HomePage = () => {
  const { data, isLoading, isSuccess } = useGetProductsQuery(undefined);

  const products = data || [];
  console.log(products);
  // const carouselData: any = [];
  // if (products?.data?.result && products?.data?.result) {
  //   products?.data?.result.map((item: any) =>
  //     carouselData.push(item.images[0])
  //   );
  // }

  // Extract all images into a single array and limit to 10
  // const imageArray = products?.data?.result
  //   .flatMap((item: any) => item.images)
  //   .slice(0, 10);

  // console.log(imageArray);

  const someProducts = products?.data?.result.slice(0, 8);

  const bestSellingProducts =
    products?.data?.result
      ?.filter((product: TProduct) => product.bestSell)
      .slice(0, 4) || [];

  const firstImages = products?.data?.result
    .map((item: ProductImages) => item.images[0]) // Get first image of each product
    .slice(0, 10); // Limit to 10 images

  if (isLoading)
    return (
      <>
        <div className="container vh-100 d-flex justify-content-center align-items-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      </>
    );
  else if (!isSuccess) {
    return (
      <>
        <div className="container vh-100 d-flex justify-content-center align-items-center">
          <h2>No Data Found</h2>
        </div>
      </>
    );
  } else
    return (
      <>
        <div className="container">
          {products?.data?.result && (
            <CarouselComponent ImgData={firstImages} />
          )}
        </div>

        <ProductComponents data={someProducts} title={"Our Products"} />
        <ProductComponents
          data={bestSellingProducts}
          title={"Best Selling Products"}
        />
        <Testmonial />
      </>
    );
};

export default HomePage;
