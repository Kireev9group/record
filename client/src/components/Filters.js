import { useContext, useState } from "react";
import { Context } from "..";
import {
  Card,
  Col,
  Container,
  Form,
  Image,
  Row,
  Button,
} from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import "../styles/DeviceList.css";
import { makeObservable, observable, action } from "mobx";

const Filters = observer(() => {
  const { device } = useContext(Context);
  const [searchQuery, setSearchQuery] = useState("");
  const [sorted, setSorted] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSortAZ = () => {
    const sortedDevices = device.records.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    device.setRecords(sortedDevices);
    setSorted(true);
  };

  const handleSortZA = () => {
    const sortedDevices = device.records.sort((a, b) =>
      b.name.localeCompare(a.name)
    );
    device.setRecords(sortedDevices);
    setSorted(true);
  };

  const filteredDevices = device.records.filter((d) =>
    d.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (sorted && filteredDevices.length !== device.records.length) {
    setSorted(false);
  }

  return (
    <Container className="container-custom">
      <Row className="mt-3 mb-3 justify-content-between align-items-center">
        <Col md={6}>
          <Form.Control
            type="text"
            placeholder="Поиск пластинок"
            value={searchQuery}
            onChange={handleSearch}
          />
        </Col>
        <Col md={6} className="text-right">
          <Button variant="secondary" onClick={handleSortAZ}>
            A-Z
          </Button>{" "}
          <Button variant="secondary" onClick={handleSortZA}>
            Z-A
          </Button>
        </Col>
      </Row>
      <Row className="mt-3">
        {filteredDevices.map((d) => (
          <Col
            md={3}
            className="mb-4"
            id={d.id}
            onClick={() => navigate(`/device/${d.id}`)}
          >
            <Card className="device-card">
              <Image
                className="device-img"
                src={"http://localhost:5000/" + d.img}
              />
              <Card.Body>
                <Card.Title className="device-title">{d.name}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
});

export default Filters;
