import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import { useGetProductsQuery } from "../redux/features/product/productApi";
import { TProduct } from "../redux/features/product/productSlice";
import { TQueryParam } from "../types/global";

const ProductPage = () => {
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100); // Adjust delay as needed
  }, []);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);

  const { data: products, isLoading, isSuccess } = useGetProductsQuery(params);

  useEffect(() => {
    const queryParams = [];
    if (searchTerm) queryParams.push({ name: "searchTerm", value: searchTerm });
    if (category) queryParams.push({ name: "category", value: category });

    setParams(queryParams);
  }, [searchTerm, category]);

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
      <Container className="py-4">
        <h2 className="text-center mb-4">🏍️ Find Your Bike</h2>

        {/* Search Bar */}
        <Form.Control
          type="text"
          placeholder="🔍 Search by brand, bike name, or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-3"
        />

        {/* Filters */}
        <Row className="mb-3">
          <Col xs={12} sm={6} md={3} className="mb-2">
            <Form.Group className="mb-3">
              <Form.Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Filter by Category</option>
                <option value="Mountain">Mountain</option>
                <option value="Road">Road</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Electric">Electric</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col xs={12} sm={6} md={3} className="mb-2">
            {/* <Form.Select
            onChange={(e) =>
              setFilters({ ...filters, category: e.target.value })
            }
          >
            <option value="">📂 Filter by Category</option>
            <option value="Sports">Sports</option>
            <option value="Cruiser">Cruiser</option>
            <option value="Naked">Naked</option>
          </Form.Select> */}
          </Col>
          <Col xs={12} sm={6} md={3} className="mb-2">
            {/* <Form.Select
            onChange={(e) =>
              setFilters({ ...filters, priceRange: e.target.value })
            }
          >
            <option value="">💰 Filter by Price</option>
            <option value="low">Below ₹2,00,000</option>
            <option value="high">Above ₹2,00,000</option>
          </Form.Select> */}
          </Col>
          <Col xs={12} sm={6} md={3} className="mb-2">
            {/* <Form.Select
            onChange={(e) =>
              setFilters({ ...filters, availability: e.target.value })
            }
          >
            <option value="">✅ Availability</option>
            <option value="available">In Stock</option>
            <option value="unavailable">Out of Stock</option>
          </Form.Select> */}
          </Col>
        </Row>

        {/* Products List */}
        <Row>
          {products?.data?.result.length > 0 ? (
            products?.data?.result.map((product: TProduct) => (
              <Col
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={product._id}
                className="mb-4"
              >
                <Card className="shadow-sm">
                  <Card.Img
                    variant="top"
                    src={product.images[0]}
                    alt={product.name}
                    style={{ height: "180px", objectFit: "cover" }}
                  />
                  <Card.Body>
                    <Card.Title className="fw-bold">{product.name}</Card.Title>
                    <Card.Text className="small text-muted">
                      <strong>Brand:</strong> {product.brand} <br />
                      <strong>Model:</strong> {product.model} <br />
                      <strong>Category:</strong> {product.category} <br />
                      <strong>Price:</strong> ₹{product.price.toLocaleString()}{" "}
                      <br />
                      <strong>Availability:</strong>{" "}
                      {product.inStock ? "✅ In Stock" : "❌ Out of Stock"}
                    </Card.Text>
                    <Button variant="primary" size="sm">
                      🔍 View Details
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <p className="text-center">
              ❌ No bikes found matching your criteria.
            </p>
          )}
        </Row>
      </Container>
    );
};

export default ProductPage;
