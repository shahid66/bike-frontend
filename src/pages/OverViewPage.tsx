import { Card, Col, Row } from "react-bootstrap";
import { TUser, useCurrentToken } from "../redux/features/auth/authSlice";
import { useAppSelector } from "../redux/hooks";
import { verifyToken } from "../utils/verifyToken";

const OverViewPage = () => {
  const token = useAppSelector(useCurrentToken);

  let user;

  if (token) {
    user = verifyToken(token) as TUser;
  }
  return (
    <div>
      <h2>📊 Overview</h2>
      <Row className="mt-4">
        <h2>Welcome</h2>
        {/* <Col md={user?.role === "customer" ? 12 : 6}>
  <h5>📦 Latest Orders</h5>
  <Table bordered>
    <thead>
      <tr>
        <th>ID</th>
        <th>Product</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>101</td>
        <td>Bike Helmet</td>
        <td>Delivered</td>
      </tr>
    </tbody>
  </Table>
</Col>
<Col
  md={6}
  style={{ ...(user?.role === "customer" ? { display: "none" } : {}) }}
>
  <h5>👥 Recent Users</h5>
  <Table bordered>
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Role</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td>John Doe</td>
        <td>Admin</td>
      </tr>
    </tbody>
  </Table>
</Col> */}
      </Row>
      <br />
      {/* Cards Section */}
      {user?.role === "admin" && (
        <Row>
          <Col md={3}>
            <Card className="p-3 text-center">
              <h5>Users</h5>
              <h2>1,200</h2>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="p-3 text-center">
              <h5>Sales</h5>
              <h2>500</h2>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="p-3 text-center">
              <h5>Orders</h5>
              <h2>300</h2>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="p-3 text-center">
              <h5>Revenue</h5>
              <h2>$20,000</h2>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default OverViewPage;
