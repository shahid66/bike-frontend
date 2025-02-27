import { useState } from "react";
import { Col, Dropdown, Row, Spinner, Table } from "react-bootstrap";
import { TUser, useCurrentToken } from "../../redux/features/auth/authSlice";
import {
  useGetUserOrdersQuery,
  useUpdateOrderStatusMutation,
} from "../../redux/features/order/orderApi";
import { useAppSelector } from "../../redux/hooks";
import { verifyToken } from "../../utils/verifyToken";

const AllOrders = () => {
  const token = useAppSelector(useCurrentToken);

  let user;

  if (token) {
    user = verifyToken(token) as TUser;
  }
  const { data: Orders, isLoading, isSuccess } = useGetUserOrdersQuery();
  const [updateOrder] = useUpdateOrderStatusMutation();

  const [selectedItems, setSelectedItems] = useState({}); // Store selection for each order

  const handleSelect = async (orderId, selectedValue) => {
    setSelectedItems((prev) => ({
      ...prev,
      [orderId]: selectedValue, // Update only the selected order
    }));
    console.log(selectedValue);
    await updateOrder({ orderId, selectedValue });
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
    return (
      <div>
        <Row className="mt-4">
          <Col>
            <h5>📦 All Orders</h5>
            <Table bordered responsive="md">
              <thead>
                <tr>
                  <th>SR</th>
                  <th>Product</th>
                  <th>Sub Total</th>
                  <th>Discount</th>
                  <th>Delivery Charge</th>
                  <th>Total Amount</th>
                  <th> Status</th>
                  {user?.role === "admin" && <th> Action</th>}
                </tr>
              </thead>
              {isSuccess && (
                <tbody>
                  {Orders?.data &&
                    Orders?.data?.map((order, i: number) => (
                      <tr key={order._id}>
                        <td>{i + 1}</td>
                        <td>
                          <tr className="d-flex justify-content-around">
                            <th>Product Name</th>
                            <th>Product Price</th>

                            <th>Quantity</th>
                          </tr>{" "}
                          {order.products.map((item, idx) => (
                            <tr className="d-flex justify-content-around align-items-center">
                              <td key={idx}>{item.product?.name}</td>
                              <td key={idx}>{item.product?.price}</td>
                              <td key={idx}>{item.quantity}</td>
                            </tr>
                          ))}
                        </td>
                        <td>{order.subtotal}</td>

                        <td>{order.discount}</td>
                        <td>{order.deliveryCharge}</td>
                        <td>{order.totalPrice}</td>
                        <td>{order.status}</td>
                        {user?.role === "admin" && (
                          <td>
                            <Dropdown
                              onSelect={(eventKey) =>
                                handleSelect(order._id, eventKey)
                              }
                            >
                              <Dropdown.Toggle variant="success">
                                {selectedItems[order._id] || "Select Status"}
                              </Dropdown.Toggle>

                              <Dropdown.Menu>
                                <Dropdown.Item eventKey="Pending">
                                  Pending
                                </Dropdown.Item>
                                <Dropdown.Item eventKey="Paid">
                                  Paid
                                </Dropdown.Item>
                                <Dropdown.Item eventKey="Shipped">
                                  Shipped
                                </Dropdown.Item>
                                <Dropdown.Item eventKey="Completed">
                                  Completed
                                </Dropdown.Item>
                                <Dropdown.Item eventKey="Cancelled">
                                  Cancelled
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </td>
                        )}
                      </tr>
                    ))}
                </tbody>
              )}
            </Table>
          </Col>
        </Row>
      </div>
    );
};

export default AllOrders;
