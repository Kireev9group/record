import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Image,
  Card,
  Button,
  ListGroup,
  Toast,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import { fetchOneDevice } from "../http/deviceAPI";
import "../styles/RecordPage.css";

const RecordPage = () => {
  const [device, setDevice] = useState({ info: [] });
  const { id } = useParams();
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    fetchOneDevice(id).then((data) => setDevice(data));
  }, []);

  const handleBuy = () => {
    if (!device.link) {
      setShowError(true);
    } else {
      window.location.href = device.link;
    }
  };

  return (
    <Container className="my-5">
      <Row className="mb-4">
        <Col md={6}>
          <Image
            fluid
            src={"http://localhost:5000/" + device.img}
            height={600}
            width={600}
            style={{ objectFit: "cover", border: "3px solid #ccc" }}
          />
        </Col>
        <Col md={6}>
          <Card className="p-4">
            <Card.Header className="card-header mb-3">
              {device.name}{" "}
            </Card.Header>
            {!device.link ? (
              ""
            ) : (
              <Button
                variant={"dark"}
                className="w-100 mb-4"
                onClick={handleBuy}
              >
                {"Не знаешь, где купить? Нажми."}
              </Button>
            )}
            <Card className="p-4">
              <h4 className="mb-3">Характеристики:</h4>
              <ListGroup className="mb-4">
                {device.info.map((info) => (
                  <ListGroup.Item key={info.id}>
                    <strong>{info.title} </strong>
                    {info.description}
                  </ListGroup.Item>
                ))}

                <h4 className="mt-4">Описание:</h4>
                <ListGroup.Item>{device.description}</ListGroup.Item>
              </ListGroup>
            </Card>
          </Card>
        </Col>
      </Row>
      <Toast
        show={showError}
        onClose={() => setShowError(false)}
        style={{
          position: "fixed",
          bottom: "1rem",
          right: "1rem",
          minWidth: "250px",
        }}
      >
        <Toast.Header>
          <strong className="mr-auto">Ошибка</strong>
        </Toast.Header>
        <Toast.Body>
          В данный момент данной пластинки нигде нет в наличии.
        </Toast.Body>
      </Toast>
    </Container>
  );
};

export default RecordPage;
