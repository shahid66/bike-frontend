import { useEffect, useState } from "react";
import {
  Button,
  Carousel,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";

import { useNavigate, useParams } from "react-router-dom";

import ProductComponents from "../components/ProductComponents";
import { addToCart } from "../redux/features/cart/cartSlice";
import {
  useGetProductsQuery,
  useGetSingleProductsQuery,
} from "../redux/features/product/productApi";
import { TProduct } from "../redux/features/product/productSlice";
import { useAppDispatch } from "../redux/hooks";

const ProductDetailsPage = () => {
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100); // Adjust delay as needed
  }, []);
  const { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState(1);
  const {
    data: product,
    isSuccess,
    isLoading,
  } = useGetSingleProductsQuery(productId);

  const { data: products, isSuccess: productSuccess } =
    useGetProductsQuery(undefined);

  // Find similar products based on category (excluding current product)
  const similarProducts = products?.data?.result
    .filter(
      (item: TProduct) =>
        item.category === product?.data?.category &&
        item._id !== product?.data?._id
    )
    .slice(0, 4);

  const addToCartHandler = (
    product: string,
    productName: string,
    price: number,
    stock: number,
    image: string
  ) => {
    dispatch(
      addToCart({ product, productName, quantity, price, stock, image })
    );
  };
  const buyHandler = (
    product: string,
    productName: string,
    price: number,
    stock: number,
    image: string
  ) => {
    dispatch(
      addToCart({ product, productName, quantity, price, stock, image })
    );
    navigate("/cart");
  };

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

  if (isSuccess) {
    return (
      <Container className="py-4">
        <Row>
          {/* Image Carousel */}
          <Col md={6}>
            <Carousel indicators={false}>
              {product?.data?.images.map((img: string, index: number) => (
                <Carousel.Item key={index}>
                  <img
                    src={img}
                    alt={`Product ${index}`}
                    className="d-block w-100"
                    style={{ borderRadius: "10px", height: "400px" }}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>

          {/* Product Details */}
          <Col md={6}>
            <h2>{product?.data?.name}</h2>

            <p>
              <strong>Model:</strong> {product?.data?.model}
            </p>
            <p>
              <strong>Price:</strong> ₹{product?.data?.price}
            </p>
            <p>
              <strong>Stock:</strong>{" "}
              {product?.data?.quantity > 0
                ? `${product?.data?.quantity} Available`
                : "Out of Stock"}
            </p>

            {/* Quantity Selector */}
            {product?.data?.quantity > 0 && (
              <div className="d-flex align-items-center mb-3">
                <Button
                  variant="outline-secondary"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </Button>
                <Form.Control
                  type="text"
                  value={quantity}
                  readOnly
                  className="text-center mx-2"
                  style={{ width: "50px" }}
                />
                <Button
                  onClick={() =>
                    setQuantity((prevQuantity) =>
                      Math.min(prevQuantity + 1, product?.data?.quantity)
                    )
                  }
                >
                  +
                </Button>
              </div>
            )}
            {product?.data?.quantity > 0 && (
              <>
                <Button
                  variant="primary"
                  className="me-2"
                  onClick={() =>
                    addToCartHandler(
                      product?.data?._id,
                      product?.data?.name,
                      product?.data?.price,
                      product?.data?.quantity,
                      product?.data?.images[0]
                    )
                  }
                >
                  🛒 Add to Cart
                </Button>
                <Button
                  variant="success"
                  onClick={() =>
                    buyHandler(
                      product?.data?._id,
                      product?.data?.name,
                      product?.data?.price,
                      product?.data?.quantity,
                      product?.data?.images[0]
                    )
                  }
                >
                  🚀 Buy Now
                </Button>
              </>
            )}
          </Col>
        </Row>

        {/* Specifications */}
        <Row className="mt-5">
          <Col>
            <h4>📌 Product Description</h4>
            <p>{product?.data?.description}</p>
          </Col>
        </Row>

        {/* Similar Products Section */}

        {productSuccess && (
          <ProductComponents
            data={similarProducts}
            title={"Similar Products"}
          />
        )}
      </Container>
    );
  }
};

export default ProductDetailsPage;
