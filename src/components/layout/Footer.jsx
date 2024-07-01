import { Col, Container, Row } from "react-bootstrap";

const Footer = () => {
  const today = new Date();
  return (
    <footer className="by-dark text-light py-3 footer mt-lg-5">
      <Container>
        <Row>
          <Col xs={12} md={12} className="text-center">
            <p className="mb-0">
              &copy; {today.getFullYear()} Presidential Hotel{" "}
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
