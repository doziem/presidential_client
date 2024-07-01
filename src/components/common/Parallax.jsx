import { Container } from "react-bootstrap";

const Parallax = () => {
  return (
    <div className="parallax mb-5">
      <Container className="text-center px-5 py-5 justify-content-center">
        <div className="animated-texts bounceIn">
          <h1>
            Welcome to <span className="hotel-color">Presidential Hotel</span>
          </h1>
          <h3>We Offer the best Service for all your needs</h3>
        </div>
      </Container>
    </div>
  );
};

export default Parallax;
