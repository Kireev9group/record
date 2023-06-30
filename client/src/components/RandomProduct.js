import { useState, useEffect, useContext } from "react";
import { Button, Card, Image } from "react-bootstrap";
import { Context } from "..";
import "../styles/RandomProduct.css";
import { useNavigate } from "react-router-dom";

const RandomProduct = () => {
  const { device } = useContext(Context);
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let randomIndex;
    const savedIndex = localStorage.getItem("randomProductIndex");
    if (savedIndex !== null && savedIndex < device.records.length) {
      // Если сохраненный индекс продукта валидный, используем его
      randomIndex = savedIndex;
    } else {
      // Иначе генерируем новый случайный индекс
      randomIndex = Math.floor(Math.random() * device.records.length);
      // Сохраняем индекс в localStorage для следующих рендеров
      localStorage.setItem("randomProductIndex", randomIndex);
    }
    const randomProduct = device.records[randomIndex];
    setProduct(randomProduct);
  }, [device.records]);

  return (
    <Card>
      <Card.Body className="card-body1">
        <Card.Title>Пластинка дня</Card.Title>
        {product ? (
          <>
            <Card.Img
              src={"http://localhost:5000/" + product.img}
              className="device-img1"
            />
            <Card.Text className="device-title">{product.name}</Card.Text>
            <Button
              variant="primary"
              onClick={() => navigate(`/device/${product.id}`)}
            >
              Перейти на страницу пластинки
            </Button>
          </>
        ) : (
          <p>Пластинка дня загружается...</p>
        )}
      </Card.Body>
    </Card>
  );
};

export default RandomProduct;
