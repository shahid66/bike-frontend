import { Col, Container, Row } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import Sidebar from "./Sidebar";

const MainLayout = () => {
  return (
    <>
      <Navbar />

      <Container className="vh-100">
        <Row>
          {/* Sidebar */}
          <Sidebar />
          <Col md={10} className="p-4">
            <Outlet />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default MainLayout;
