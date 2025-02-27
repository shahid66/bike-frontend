import { Carousel } from "react-bootstrap";

interface CarouselProps {
  ImgData: string[]; //
}
const CarouselComponent: React.FC<CarouselProps> = ({ ImgData }) => {
  return (
    <div className="container">
      <Carousel interval={3000} controls={true} indicators={true} pause="hover">
        {ImageData &&
          ImgData.map((product: string) => (
            <Carousel.Item key={product}>
              <div className="d-flex justify-content-center">
                <img
                  src={product}
                  alt=".."
                  className="d-block w-100"
                  style={{ height: "600px", objectFit: "cover" }}
                />
              </div>
            </Carousel.Item>
          ))}
      </Carousel>
    </div>
  );
};

export default CarouselComponent;
