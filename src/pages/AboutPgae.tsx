import Logo from "../assets/user/logo (2).png";

const AboutPage = () => {
  return (
    <div className="container mt-5">
      {/* Hero Section */}
      <div className="row align-items-center mb-5">
        <div className="col-md-6">
          <h1 className="fw-bold">
            About <span className="text-primary">Our Bike Shop</span>
          </h1>
          <p className="lead">
            We have been providing top-quality bicycles and services since 2005.
            Whether you're a professional rider or a casual cyclist, we have the
            perfect ride for you!
          </p>
        </div>
        <div className="col-md-6 text-center">
          <img
            src={Logo}
            alt="Bike Shop"
            style={{ height: "90px", width: "90px" }}
            className="img-fluid rounded shadow"
          />
        </div>
      </div>

      {/* Our Story */}
      <div className="row mb-5">
        <div className="col-md-12">
          <h2 className="text-secondary fw-bold">Our Story</h2>
          <p>
            Founded in 2005, our bike shop started as a small garage business
            catering to cycling enthusiasts. Over the years, we have grown into
            a full-fledged store offering a wide range of bicycles, accessories,
            and repair services.
          </p>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="row mb-5">
        <h2 className="text-secondary fw-bold">Why Choose Us?</h2>
        <div className="col-md-4">
          <div className="card p-3 shadow-sm">
            <h5 className="fw-bold">Wide Selection</h5>
            <p>
              From mountain bikes to road bikes, we have a variety of brands and
              models.
            </p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card p-3 shadow-sm">
            <h5 className="fw-bold">Expert Service</h5>
            <p>
              Our experienced mechanics ensure your bike is always in top shape.
            </p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card p-3 shadow-sm">
            <h5 className="fw-bold">Affordable Prices</h5>
            <p>We offer competitive prices on all bikes and services.</p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="row mb-5">
        <h2 className="text-secondary fw-bold">Meet Our Team</h2>
        <div className="col-md-4 text-center">
          <img
            src="https://randomuser.me/api/portraits/men/1.jpg"
            alt="Team Member"
            className="rounded-circle shadow mb-3"
          />
          <h5>John Doe</h5>
          <p>Founder & CEO</p>
        </div>
        <div className="col-md-4 text-center">
          <img
            src="https://randomuser.me/api/portraits/men/3.jpg"
            alt="Team Member"
            className="rounded-circle shadow mb-3"
          />
          <h5>Jane Smith</h5>
          <p>Head Mechanic</p>
        </div>
        <div className="col-md-4 text-center">
          <img
            src="https://randomuser.me/api/portraits/men/2.jpg"
            alt="Team Member"
            className="rounded-circle shadow mb-3"
          />
          <h5>Mike Johnson</h5>
          <p>Sales Manager</p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
