import { useState } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  Row,
  Table,
} from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import {
  addToCart,
  applyCoupon,
  checkOut,
  clearCart,
  removeCoupon,
  removeFromCart,
} from "../redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const discountCoupons: Record<string, number> = {
  SAVE10: 0.1, // 10% discount
  BIKE5: 0.05, // 5% discount
};

const CartPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location, "check");
  const { cart, couponCode, discountAmount } = useAppSelector(
    (state) => state.cart
  );
  const { user } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const [coupon, setCoupon] = useState("");
  const [message, setMessage] = useState("");

  const updateQuantity = (
    id: string,
    change: number,
    stock: number | undefined
  ) => {
    const item = cart.find((item) => item.product === id);
    if (!item) return;

    const availableStock = stock ?? Infinity;
    const newQuantity = item.quantity + change;

    if (newQuantity > availableStock) {
      setMessage("❌ Cannot add more than available stock!");
      return;
    }

    if (newQuantity <= 0) {
      dispatch(removeFromCart({ product: id }));
    } else {
      dispatch(
        addToCart({
          product: id,
          quantity: change,
          price: item.price,
          stock: availableStock,
        })
      );
    }
  };

  const applyCouponHandler = () => {
    if (discountCoupons[coupon]) {
      dispatch(
        applyCoupon({
          couponCode: coupon,
          discountAmount: discountCoupons[coupon],
        })
      );
      setMessage(
        `Coupon applied! You got a ${(discountCoupons[coupon] * 100).toFixed(
          0
        )}% discount.`
      );
    } else {
      setMessage("Invalid coupon code!");
    }
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discountedPrice = totalPrice - totalPrice * discountAmount;
  const clearCartData = () => {
    dispatch(clearCart());
  };

  const checkOutHandle = () => {
    const subTotal = totalPrice;
    const discount = totalPrice * discountAmount;
    const Total = discountedPrice;
    dispatch(checkOut({ subTotal, discountAmount: discount, Total }));
    if (!user?.role) {
      navigate("/login", { state: { form: location } }); // Save current page for redirection
    } else {
      navigate("/checkout");
    }
  };
  return (
    <Container className="py-4">
      <h2>🛒 Your Cart</h2>
      {message && (
        <Alert variant={discountAmount ? "success" : "danger"}>{message}</Alert>
      )}

      <div
        style={{
          maxHeight: "400px",
          overflowY: "auto",
          border: "1px solid #ddd",
          padding: "10px",
        }}
      >
        <Table bordered hover>
          <thead
            style={{
              position: "sticky",
              top: 0,
              background: "white",
              zIndex: 1,
            }}
          >
            <tr>
              <th>#</th>
              <th>Product</th>
              <th>Image</th>
              <th>Price (৳)</th>
              <th>Quantity</th>

              <th>Total (৳)</th>
              <th>Action </th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <tr key={item.product}>
                <td>{index + 1}</td>
                <td>{item.productName}</td>
                <td>
                  <img
                    src={item.image}
                    alt={item.productName}
                    width={50}
                    height={50}
                  />
                </td>
                <td>{item.price.toLocaleString()}</td>
                <td>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => updateQuantity(item.product, -1)}
                  >
                    -
                  </Button>
                  <span className="mx-2">{item.quantity}</span>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => updateQuantity(item.product, 1)}
                    disabled={item.quantity >= item.stock} // Prevent exceeding stock
                  >
                    +
                  </Button>
                </td>

                <td>{((item.price as number) * item.quantity).toLocaleString()}</td>
                <td>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => dispatch(removeFromCart(item.product))}
                  >
                    Remove
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Row className="mt-4">
        <Col md={6}>
          <Form>
            <Form.Group>
              <Form.Label>🎟 Apply Coupon</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter coupon code"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
              />
            </Form.Group>
            <Button
              variant="info"
              className="mt-2"
              onClick={applyCouponHandler}
            >
              Apply
            </Button>
            {couponCode && (
              <Button
                variant="danger"
                className="mt-2 ms-2"
                onClick={() => dispatch(removeCoupon())}
              >
                Remove Coupon
              </Button>
            )}
          </Form>
        </Col>

        <Col md={6} className="text-end">
          <h4>Subtotal: ৳{totalPrice.toLocaleString()}</h4>
          {couponCode && (
            <h4>
              Discount ({couponCode}): -৳
              {(totalPrice * discountAmount).toLocaleString()}
            </h4>
          )}
          <h3>
            <strong>Total: ৳{discountedPrice.toLocaleString()}</strong>
          </h3>

          <Button variant="success" onClick={checkOutHandle} className="mt-3">
            {user?.role ? " 🛍 Proceed to Checkout" : "Login to Checkout"}
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default CartPage;
