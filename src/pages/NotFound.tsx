import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container className="text-center mt-5">
      <h1 className="display-3 text-danger">404</h1>
      <h2>Oops! Page Not Found</h2>
      <p>The page you are looking for doesn't exist.</p>
      <Button variant="primary" onClick={() => navigate("/")}>
        Go Home
      </Button>
    </Container>
  );
};

export default NotFound;
