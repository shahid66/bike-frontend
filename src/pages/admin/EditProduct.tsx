import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { FieldValues, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import {
  useGetSingleProductsQuery,
  useUpdateProductMutation,
} from "../../redux/features/product/productApi";
import { TProduct } from "../../redux/features/product/productSlice";

const EditProduct = () => {
  const { productId } = useParams();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TProduct>();
  const [updateProduct, { isLoading }] = useUpdateProductMutation();
  const { data: product, isLoading: productLoading } =
    useGetSingleProductsQuery(productId);
  const {
    name,
    brand,
    category,
    model,
    price,
    quantity,
    description,
    offered,
    bestSell,
    inStock,
  } = product?.data || {};

  console.log(product);

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Product Updating");

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

    //   formData.forEach((value, key) => {
    //     console.log(key, value);
    // });
    if (data.image) {
      // Append multiple files
      for (const file of data.images) {
        formData.append("images", file);
      }
    }
    try {
      const productData = { productInfo: formData, productId };
      const res = await updateProduct(productData).unwrap();

      toast.success("Product Updated", { id: toastId, duration: 2000 });
      reset();
    } catch (err) {
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
    }
  };
  if (productLoading) return <p>Loading...</p>;
  return (
    <Container className=" ">
      <h2>Edit Product</h2>
      <Form onSubmit={handleSubmit(onSubmit)} className="mt-5">
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                defaultValue={name}
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
                defaultValue={brand}
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
                defaultValue={category}
              >
                <option>Open this select menu</option>
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
                defaultValue={model}
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
                required={false}
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
                defaultValue={price}
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
                defaultValue={quantity}
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
                defaultValue={bestSell}
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
                defaultValue={inStock}
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
                defaultValue={offered}
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
                defaultValue={description}
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

export default EditProduct;
