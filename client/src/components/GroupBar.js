import { useState } from "react";
import { useContext } from "react";
import { Collapse, ListGroup } from "react-bootstrap";
import ScrollableArea from "./ScrollableArea";
import { observer } from "mobx-react-lite";
import { Context } from "..";

const GroupBar = observer(() => {
  const { device } = useContext(Context);
  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  const groupItems = device.groups.map((group) => (
    <ListGroup.Item
      style={{ cursor: "pointer" }}
      active={group.id === device.selectedGroup.id}
      key={group.id}
      onClick={() => device.setSelectedGroup(group)}
      className={group.id === device.selectedGroup.id ? "active-item" : ""}
    >
      {group.name}
    </ListGroup.Item>
  ));

  const listGroup = (
    <ListGroup className="mb-3 border rounded">
      <ListGroup.Item className="bg-secondary text-white text-center">
        Список имеющихся групп
      </ListGroup.Item>
      <ListGroup.Item
        style={{ cursor: "pointer" }}
        active={device.selectedGroup === "all"}
        onClick={() => device.setSelectedGroup("all")}
        className={device.selectedGroup === "all" ? "active-item" : ""}
      >
        Все пластинки
      </ListGroup.Item>

      {groupItems}
    </ListGroup>
  );

  return (
    <div>
      <Collapse in={isOpen}>
        <ScrollableArea height={200}>{listGroup}</ScrollableArea>
      </Collapse>
    </div>
  );
});

export default GroupBar;
