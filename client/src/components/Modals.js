import { useContext, useState } from "react";
import { Context } from "..";
import {
  Form,
  Modal,
  Button,
  Dropdown,
  Toast,
  Row,
  Col,
} from "react-bootstrap";

import { observer } from "mobx-react-lite";
import { createDevice, createGroup } from "../http/deviceAPI";

const Modals = observer(({ show, onHide }) => {
  const { device } = useContext(Context);
  const [info, setInfo] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [file, setFile] = useState(null);
  const [showError, setShowError] = useState(false);

  const addInfo = () => {
    setInfo([...info, { title: "", description: "", number: Date.now() }]);
  };
  const removeInfo = (number) => {
    setInfo(info.filter((i) => i.number !== number));
  };

  const selectFile = (e) => {
    setFile(e.target.files[0]);
  };

  const changeInfo = (key, value, number) => {
    setInfo(
      info.map((i) => (i.number === number ? { ...i, [key]: value } : i))
    );
  };

  const addDevice = () => {
    if (!name || !description || !device.selectedGroup || !info || !file) {
      setShowError(true);
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("img", file);
    formData.append("groupId", device.selectedGroup.id);
    formData.append("link", link);
    formData.append("info", JSON.stringify(info));

    createDevice(formData).then((data) => onHide());
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить пластинку
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Dropdown>
            <Dropdown.Toggle>
              {device.selectedGroup.name || "Выберите тип"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {device.groups.map((group) => (
                <Dropdown.Item
                  onClick={() => device.setSelectedGroup(group)}
                  key={group.id}
                >
                  {group.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Form.Control
            value={name}
            className="mt-2"
            placeholder="Введите название пластинки"
            onChange={(e) => setName(e.target.value)}
          />
          <Form.Control
            value={link}
            className="mt-2"
            placeholder="Вставьте ссылку, где продается пластинка"
            onChange={(e) => setLink(e.target.value)}
          />
          <Form.Control
            value={description}
            className="mt-2"
            placeholder="Введите описание пластинки"
            onChange={(e) => setDescription(e.target.value)}
          />
          <Form.Control
            className="mt-2 mb-2"
            name="img"
            type="file"
            enctype="multipart/form-data"
            onChange={selectFile}
          />
          <hr />
          <Button variant="outline-dark" onClick={addInfo}>
            Добавить описание пластинки
          </Button>
          {info.map((i) => (
            <Row className="mt-3 mb-3" key={i.number}>
              <Col md={4}>
                <Form.Control
                  value={i.title}
                  onChange={(e) =>
                    changeInfo("title", e.target.value, i.number)
                  }
                  placeholder="Введите название характеристики"
                />
              </Col>
              <Col md={4}>
                <Form.Control
                  value={i.description}
                  onChange={(e) =>
                    changeInfo("description", e.target.value, i.number)
                  }
                  placeholder="Введите описание характеристики"
                />
              </Col>
              <Col md={4}>
                <Button
                  onClick={() => removeInfo(i.number)}
                  variant="outline-danger"
                >
                  {" "}
                  Удалить{" "}
                </Button>
              </Col>
            </Row>
          ))}
          <hr />
          {/* <Form.Control placeholder="Введите описание товара" /> */}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>
          Закрыть
        </Button>
        <Button variant="outline-success" onClick={addDevice}>
          Добавить
        </Button>
      </Modal.Footer>
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
        <Toast.Body>Пожалуйста, заполните все поля корректно.</Toast.Body>
      </Toast>
    </Modal>
  );
});

export default Modals;
