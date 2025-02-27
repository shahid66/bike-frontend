import { useState } from "react";
import { Button, Card, Col, Container, Row, Spinner } from "react-bootstrap";
import ModalForm from "../components/ModalForm";
import { useGetUserQuery } from "../redux/features/auth/authApi";
import { TUser, useCurrentToken } from "../redux/features/auth/authSlice";
import { useAppSelector } from "../redux/hooks";
import { verifyToken } from "../utils/verifyToken";

const ProfilePage = () => {
  const token = useAppSelector(useCurrentToken);

  let user;

  if (token) {
    user = verifyToken(token) as TUser;
  }

  const { data, isLoading, isSuccess } = useGetUserQuery(user?.id);
  console.log(data?.data);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = () => {
    handleShow();
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
      <Container className="mt-4">
        {isSuccess && (
          <>
            <Row>
              {/* Profile Section */}
              <Col md={4}>
                <Card className="p-3 text-center">
                  {data?.data?.image !== null ? (
                    <img
                      src={data?.data?.image}
                      alt="Profile"
                      className="rounded-circle mx-auto d-block mb-3"
                      width={120}
                    />
                  ) : (
                    "Update Your Profile to show Your Image"
                  )}

                  {/* <Button
                  variant="dark"
                  onClick={() => handleSubmit()}
                  className="mt-2"
                >
                  Update Profile Image
                </Button> */}
                </Card>
              </Col>

              {/* Profile Details */}
              <Col md={8}>
                <Card className="p-3">
                  <h4>Profile Details</h4>

                  <p>
                    <strong>Name:</strong> {data?.data?.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {data?.data?.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {data?.data?.phone}
                  </p>
                  <p>
                    <strong>Location:</strong> {data?.data?.address}
                  </p>
                  <Button
                    variant="dark"
                    onClick={() => handleSubmit()}
                    className="mt-2"
                  >
                    Update Profile Info
                  </Button>
                </Card>
              </Col>
            </Row>

            <ModalForm
              show={show}
              handleClose={handleClose}
              title={"Update Profile"}
              userInfo={data?.data}
            />
          </>
        )}
      </Container>
    );
};

export default ProfilePage;
