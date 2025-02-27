import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { toast } from "sonner";
import { clearCart, removeCoupon } from "../redux/features/cart/cartSlice";
import { useCreateOrderMutation } from "../redux/features/order/orderApi";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const CheckoutPage = () => {
  const dispatch = useAppDispatch();
  const [createOrder] = useCreateOrderMutation();
  const { cart, couponCode, discountAmount, subTotal, Total } = useAppSelector(
    (state) => state.cart
  );

  const [order, setOrder] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    phone: "",

    paymentMethod: "Card",
  });

  const handleChange = (e) => {
    setOrder({ ...order, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const orderData = {
        products: cart,
        addressData: order,
        couponCode,
      };
      const toastId = toast.loading("Order Creating..");
      const response = await createOrder(orderData).unwrap(); // Unwrap RTK Query response
      console.log(response);
      if (response?.data)
        toast.success(response.message, { id: toastId, duration: 2000 });
      dispatch(clearCart());
      dispatch(removeCoupon());
      if (response?.data) {
        window.location.href = response.data; // Redirect to SurjoPay
      } else {
        console.error("Payment URL not found", response);
        toast.success("Payment URL not found", { id: toastId, duration: 2000 });
      }
    } catch (err) {
      toast.error("Error processing order");
      console.error("Error processing order", err);
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const orderData = {
  //     products: cart,
  //     addressData: order,
  //     couponCode,
  //   };
  //   console.log("Order Data", orderData);
  //   let res = await createOrder(orderData);
  //   console.log("response", res);
  // };

  return (
    <Container className="py-4">
      <h2>🛍 Checkout</h2>

      <Form onSubmit={handleSubmit}>
        <Row>
          {/* Delivery Address */}
          <Col md={6}>
            <h4>📍 Delivery Address</h4>
            <Form.Group className="mb-3">
              <Form.Label> Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                required
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                required
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                required
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                name="city"
                required
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                required
                onChange={handleChange}
              />
            </Form.Group>
          </Col>

          {/* Payment Options */}
          <Col md={6}>
            <h4>💳 Payment Method</h4>
            <Form.Group className="mb-3">
              <Form.Check
                type="radio"
                label="Card"
                name="paymentMethod"
                value="Card"
                checked={order.paymentMethod === "Card"}
                onChange={handleChange}
              />
            </Form.Group>

            <h4>🛒 Order Summary</h4>
            <p>
              <strong>Subtotal:</strong> ৳{subTotal}
            </p>
            <p>
              <strong>Discount:</strong> ৳{discountAmount}
            </p>
            <p>
              <strong>Delivery Fee:</strong> ৳100
            </p>
            <h5>
              <strong>Total: ৳{Total + 100}</strong>
            </h5>

            <Button variant="success" type="submit" className="mt-3">
              ✅ Place Order
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default CheckoutPage;
