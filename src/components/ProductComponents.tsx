import { Button, Card, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const ProductComponents = ({ data, title }) => {
  return (
    <div className="container my-5">
      <h2 className="text-center product-title">{title}</h2>
      <div className="row">
        {data.map((item, i) => (
          <Col xs={12} sm={6} md={4} lg={3} key={i} className="mb-4">
            <Card className="shadow-sm">
              <Card.Img
                variant="top"
                src={item.images[0]}
                alt=""
                style={{ height: "180px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title className="fw-bold">{item.name}</Card.Title>
                <Card.Text className="small text-muted">
                  <strong>Brand:</strong>
                  {item.brand} <br />
                  <strong>Model:</strong> {item.model} <br />
                  <strong>Category:</strong> {item.category} <br />
                  <strong>Price:</strong> ৳{item.price}
                  <br />
                  <strong>Availability:</strong>{" "}
                  {item.quantity > 0 ? "✅ In Stock" : "❌ Out of Stock"}
                </Card.Text>
                <Button variant="primary" size="sm">
                  <NavLink
                    className="text-white"
                    to={`/product-details/${item._id}`}
                  >
                    🔍 View Details
                  </NavLink>
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </div>
      {title == "Our Products" && (
        <NavLink to={"/product"} className="btn">
          View All
        </NavLink>
      )}
    </div>
  );
};

export default ProductComponents;
