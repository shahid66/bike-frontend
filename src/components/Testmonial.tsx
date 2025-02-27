import { Carousel } from "react-bootstrap";

const reviews = [
  {
    id: 1,
    productName: "Product 1",
    reviewer: "John Doe",
    rating: 5,
    reviewText: "Great product! Exceeded my expectations.",
    reviewerImage: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: 2,
    productName: "Product 2",
    reviewer: "Jane Smith",
    rating: 4,
    reviewText: "Good product, but could use some improvements.",
    reviewerImage: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    id: 3,
    productName: "Product 3",
    reviewer: "Michael Lee",
    rating: 3,
    reviewText: "It's okay, but I expected more for the price.",
    reviewerImage: "https://randomuser.me/api/portraits/men/3.jpg",
  },
];

const Testmonial = () => {
  return (
    <div className="container">
      <h2 className="text-center mb-4 product-title">What Our Customers Say</h2>
      <Carousel
        interval={5000}
        controls={false}
        indicators={false}
        pause="hover"
      >
        {reviews.map((review) => (
          <Carousel.Item key={review.id}>
            <div className="d-flex justify-content-center align-items-center">
              <img
                src={review.reviewerImage}
                alt={review.reviewer}
                className="d-block rounded-circle mx-3"
                style={{ width: "80px", height: "80px", objectFit: "cover" }}
              />
              <div>
                <p className="lead">{review.reviewText}</p>
                <h5>{review.reviewer}</h5>
                <p>
                  <strong>Product:</strong> {review.productName}
                </p>
                <p>
                  <strong>Rating:</strong> {"⭐".repeat(review.rating)}
                </p>
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default Testmonial;
