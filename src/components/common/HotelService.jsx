import { Card, Col, Container, Row } from "react-bootstrap";
import Header from "./Header";
import {
  FaClock,
  FaCocktail,
  FaParking,
  FaSnowflake,
  FaTshirt,
  FaUtensils,
  FaWifi,
} from "react-icons/fa";

const HotelService = () => {
  return (
    <>
      <Container className="mb-2">
        <Header title={"Our Service"} />
        <Row>
          <h4 className="text-center mt-4">
            Services at <span className="hotel-color">Hotel - </span>{" "}
            Presidential
            <span className="g-2">
              <FaClock
                style={{ marginLeft: "8px" }}
                // color="rgb(169, 77, 123)"
              />{" "}
              - 24-Hour Front Desk
            </span>
          </h4>
        </Row>
        <hr />
        <Row xs={1} md={2} lg={3} className="g-4 mt-2">
          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="hotle-color">
                  <FaWifi color="rgb(169, 77, 123)" /> Wifi
                </Card.Title>
                <Card.Text>
                  Stay connected with high-speed internet access
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="hotle-color">
                  <FaUtensils color="rgb(169, 77, 123)" /> Breakfast
                </Card.Title>
                <Card.Text>
                  Start your day with a delicious breakfast buffet.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="hotle-color">
                  <FaTshirt color="rgb(169, 77, 123)" /> Laundry
                </Card.Title>
                <Card.Text>
                  Keep your cloth clean and fresh with our laundry service.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="hotle-color">
                  <FaCocktail color="rgb(169, 77, 123)" /> Mini-bar
                </Card.Title>
                <Card.Text>
                  Enjoy a refreshing drink or snack from our in-room mini-bar
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="hotle-color">
                  <FaParking color="rgb(169, 77, 123)" /> Parking
                </Card.Title>
                <Card.Text>
                  Park your car conveniently in our on-site parking lot.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="hotle-color">
                  <FaSnowflake color="rgb(169, 77, 123)" /> Air Conditioning
                </Card.Title>
                <Card.Text>
                  Stay cool and comfortable with our air conditioning system
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default HotelService;
