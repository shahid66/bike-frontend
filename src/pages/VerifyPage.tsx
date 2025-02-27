import { Alert, Container, Spinner } from "react-bootstrap";
import { NavLink, useSearchParams } from "react-router-dom";
import { useVerifyOrderQuery } from "../redux/features/order/orderApi";

const VerifyPage = () => {
  const [searchParams] = useSearchParams();
  const { data, isLoading, isSuccess } = useVerifyOrderQuery(
    searchParams.get("order_id")
  );
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

  if (isSuccess)
    return (
      <Container className="container vh-100 d-flex justify-content-center align-items-center">
        <div className="text-center">
          {data?.data[0].bank_status === "Success" ? (
            <Alert variant="success" className="mt-4 text-center display-4">
              🎉 Payment Successful! Thank you for your purchase.
            </Alert>
          ) : (
            <Alert variant="danger" className="mt-4 text-center display-4">
              😢 Payment Error! .
            </Alert>
          )}

          <NavLink to={"/dashboard/orders"}>Your All Orders</NavLink>
        </div>
      </Container>
    );
};

export default VerifyPage;
