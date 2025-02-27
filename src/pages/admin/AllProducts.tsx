import { useState } from "react";
import { Button, Col, Modal, Row, Spinner, Table } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { toast } from "sonner";
import {
  useDeleteSingleProductsMutation,
  useGetProductsQuery,
} from "../../redux/features/product/productApi";
import { TProduct } from "../../redux/features/product/productSlice";
import { truncateText } from "../../utils/textSort";

const AllProducts = () => {
  const { data: products, isLoading,isSuccess } = useGetProductsQuery();
  const [productDelete] = useDeleteSingleProductsMutation();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  // State to store the selected product data
  const [selectedProduct, setSelectedProduct] = useState(null);
  const handleShow = (product: any) => {
    setSelectedProduct(product); // Store selected product data
    setShow(true); // Open modal
  };

  const deleteProduct = async (productId: string) => {
    const toastId = toast.loading("Product is deleting");
    try {
      const res = await productDelete(productId);
      console.log(res);
      toast.success(res?.data?.message, {
        id: toastId,
        duration: 2000,
      });
      handleClose();
    } catch (error) {
      toast.error("Something went wrang", { id: toastId, duration: 2000 });
      handleClose();
    }
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
    <>
      <Row className="mt-4">
        <Col>
          <h5>📦 All Products</h5>
          <Table bordered responsive="md">
            <thead>
              <tr>
                <th>SR</th>
                <th>Name</th>
                <th>category</th>
                <th>model</th>
                <th>price</th>
                <th>quantity</th>
                <th>description</th>
                <th>offered</th>
                <th>bestSell</th>
                <th>inStock</th>
                <th>Image</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products &&
                products?.data.result.map((product: TProduct, i: number) => (
                  <tr key={product._id}>
                    <td>{i + 1}</td>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td>{product.model}</td>
                    <td>{product.price}</td>
                    <td>{product.quantity}</td>
                    <td>{truncateText(product.description, 30)}</td>
                    <td>{product.offered}</td>
                    <td>{product.bestSell ? "Yes" : "No"}</td>
                    <td>{product.inStock ? "Yes" : "No"}</td>
                    <td>
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        style={{ width: "50px", height: "50px" }}
                      />
                    </td>
                    <td className="d-flex gap-2">
                      <NavLink
                        to={`/dashboard/product-edit/${product._id}`}
                        className=""
                      >
                        Edit
                      </NavLink>
                      <Button
                        variant="danger"
                        onClick={() => handleShow(product._id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Product Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            <>
              <p>
                <strong>Are you sure? You want to delete this product?</strong>{" "}
                {selectedProduct}
              </p>
            </>
          }
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() => deleteProduct(selectedProduct)}
          >
            Delete
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AllProducts;
