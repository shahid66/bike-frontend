import { Button, Form, Modal } from "react-bootstrap";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useUpdateUserMutation } from "../redux/features/auth/authApi";
import { boolean } from "zod";


 type TModal={
  show: boolean,
  handleClose: () => void;
  title: string,
  userInfo: any,
}
const ModalForm: React.FC<TModal> = ({ show , handleClose, title, userInfo }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Profile Updating..");

    const formData = new FormData();

    // Append text fields
    formData.append("address", data.address);
    formData.append("phone", data.phone);

    // Append multiple files
    for (const file of data.images) {
      formData.append("images", file);
    }

    try {
      const res = await updateUser({ formData }).unwrap();

      toast.success("Update Profile Success", { id: toastId, duration: 2000 });
      reset();
      handleClose();
    } catch (err) {
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)} className="mt-5">
          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              defaultValue={userInfo?.address}
              {...register("address", { required: true })}
            />
            {errors.address && (
              <Form.Text className="text-danger">
                This field is required
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              {...register("phone", { required: true })}
            />
            {errors.phone && (
              <Form.Text className="text-danger">
                This field is required
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Product Image</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              {...register("images", { required: true })}
            />
            {errors.image && (
              <Form.Text className="text-danger">
                This field is required
              </Form.Text>
            )}
          </Form.Group>

          <Button variant="primary" type="submit">
            {isLoading ? "Loading..." : "Submit"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalForm;
