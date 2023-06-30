import React, { useContext, useEffect } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import GroupBar from "../components/GroupBar";
import Filters from "../components/Filters";
import { observer } from "mobx-react-lite";
import { Context } from "..";
import { fetchDevice, fetchGroup } from "../http/deviceAPI";
import Pages from "../components/Pages";
import RandomProduct from "../components/RandomProduct";
import "../styles/MainPage.css";

const MainPage = observer(() => {
  const { device } = useContext(Context);

  useEffect(() => {
    fetchGroup().then((data) => device.setGroups(data));
    fetchDevice().then((data) => {
      device.setRecords(data.rows);
      device.setTotalCount(data.count);
    });
  }, []);

  useEffect(() => {
    fetchDevice(device.selectedGroup.id, device.page, device.limit).then(
      (data) => {
        device.setRecords(data.rows);
        device.setTotalCount(data.count);
      }
    );
  }, [device.page, device.selectedGroup.id]);

  return (
    <Container>
      <Row className="mt-2">
        <Col md={12} lg={3} className="mt-3">
          <RandomProduct />
          <Card className="mt-3">
            <Card.Body>
              <GroupBar />
            </Card.Body>
          </Card>
        </Col>
        <Col md={12} lg={9}>
          <Card className="mb-3 mt-3">
            <Card.Header>
              <h4>Список пластинок</h4>
            </Card.Header>
            <Card.Body>
              <Filters className="device-list" />
              <Pages />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
});

export default MainPage;
