import { Button, Card, Col, Container, Row } from "react-bootstrap";

const DashboardPage = () => {
  // Dummy data for charts
  //   const barChartData = {
  //     labels: ["Jan", "Feb", "Mar", "Apr", "May"],
  //     datasets: [
  //       {
  //         label: "Sales",
  //         data: [300, 500, 700, 600, 900],
  //         backgroundColor: "black",
  //       },
  //     ],
  //   };

  //   const lineChartData = {
  //     labels: ["Jan", "Feb", "Mar", "Apr", "May"],
  //     datasets: [
  //       {
  //         label: "Revenue",
  //         data: [5000, 7000, 9000, 11000, 15000],
  //         borderColor: "black",
  //       },
  //     ],
  //   };

  return (
    <Container fluid className="bg-light vh-100">
      <Row>
        {/* Sidebar */}
        <Col md={2} className="bg-dark text-white p-3 vh-100">
          <h4 className="text-center">Dashboard</h4>
          <ul className="list-unstyled">
            <li className="p-2">📊 Overview</li>
            <li className="p-2">👥 Users</li>
            <li className="p-2">🛒 Orders</li>
            <li className="p-2">📈 Reports</li>
            <li className="p-2">⚙️ Settings</li>
            <li className="p-2">🙍‍♂️ My Profile</li>
            <li className="p-2 text-danger">🚪 Logout</li>
          </ul>
        </Col>

        {/* Main Dashboard Content */}
        <Col md={10} className="p-4">
          <h2>📊 Overview</h2>

          {/* Cards Section */}
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

          {/* Charts Section */}
          <Row className="mt-4">
            {/* <Col md={6}>
              <Bar data={barChartData} />
            </Col>
            <Col md={6}>
              <Line data={lineChartData} />
            </Col> */}
          </Row>

          {/* Tables Section */}
          <Row className="mt-4">
            <Col md={12}>
              <h2>Welcome</h2>
            </Col>
          </Row>

          {/* Button */}
          <Button variant="dark" className="mt-3">
            View More Details
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardPage;
