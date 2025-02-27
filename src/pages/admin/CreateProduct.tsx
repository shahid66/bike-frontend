import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useCreateProductMutation } from "../../redux/features/product/productApi";
import { TProduct } from "../../redux/features/product/productSlice";
import { useAppDispatch } from "../../redux/hooks";

const CreateProduct = () => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TProduct>();
  const [createProduct, { isLoading, isError }] = useCreateProductMutation();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Product creating");

    const formData = new FormData();

    // Append text fields
    formData.append("name", data.name);
    formData.append("brand", data.brand);
    formData.append("category", data.category);
    formData.append("model", data.model);
    formData.append("price", data.price);
    formData.append("quantity", data.quantity);
    formData.append("description", data.description);
    formData.append("offered", data.offered);
    formData.append("bestSell", data.bestSell);
    formData.append("inStock", data.inStock);

    // Append multiple files
    for (const file of data.images) {
      formData.append("images", file);
    }

    try {
      const res = await createProduct(formData).unwrap();

      toast.success("Product Created", { id: toastId, duration: 2000 });
      reset();
    } catch (err) {
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
    }
  };
  return (
    <Container className=" d-flex justify-content-center align-items-center">
      <Form onSubmit={handleSubmit(onSubmit)} className="mt-5">
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Product Name"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <Form.Text className="text-danger">
                  This field is required
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="Product Brand"
                {...register("brand", { required: true })}
              />
              {errors.brand && (
                <Form.Text className="text-danger">
                  This field is required
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Product Category</Form.Label>

              <Form.Select
                aria-label="Default select example"
                {...register("category", { required: true })}
              >
                <option>Select Category</option>
                <option value="Mountain">Mountain</option>
                <option value="Road">Road</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Electric">Electric</option>
              </Form.Select>
              {errors.category && (
                <Form.Text className="text-danger">
                  This field is required
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Product Model</Form.Label>
              <Form.Control
                type="text"
                placeholder="Product Model"
                {...register("model", { required: true })}
              />
              {errors.model && (
                <Form.Text className="text-danger">
                  This field is required
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Product Image</Form.Label>
              <Form.Control
                multiple
                type="file"
                accept="image/*"
                {...register("images")}
              />
              {errors.images && (
                <Form.Text className="text-danger">
                  This field is required
                </Form.Text>
              )}
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Product Price</Form.Label>
              <Form.Control
                type="text"
                placeholder="Product Price"
                {...register("price", { required: true })}
              />
              {errors.price && (
                <Form.Text className="text-danger">
                  This field is required
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Product Quantity</Form.Label>
              <Form.Control
                type="text"
                placeholder="Product Quantity"
                {...register("quantity", { required: true })}
              />
              {errors.quantity && (
                <Form.Text className="text-danger">
                  This field is required
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Product BestSell</Form.Label>

              <Form.Select
                aria-label="Default select example"
                {...register("bestSell", { required: true })}
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </Form.Select>
              {errors.bestSell && (
                <Form.Text className="text-danger">
                  This field is required
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Product InStock</Form.Label>

              <Form.Select
                aria-label="Default select example"
                {...register("inStock", { required: true })}
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </Form.Select>
              {errors.inStock && (
                <Form.Text className="text-danger">
                  This field is required
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Product Offered</Form.Label>
              <Form.Control
                type="text"
                placeholder="Product Name"
                {...register("offered", { required: true })}
              />
              {errors.offered && (
                <Form.Text className="text-danger">
                  This field is required
                </Form.Text>
              )}
            </Form.Group>
          </Col>
          <Col md={12}>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Product Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                {...register("description", { required: true })}
              />
              {errors.description && (
                <Form.Text className="text-danger">
                  This field is required
                </Form.Text>
              )}
            </Form.Group>
          </Col>
        </Row>
        <Col className="d-flex justify-content-center">
          <Button variant="primary" type="submit">
            {isLoading ? "Loading..." : "Submit"}
          </Button>
        </Col>
      </Form>
    </Container>
  );
};

export default CreateProduct;
