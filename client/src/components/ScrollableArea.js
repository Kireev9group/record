import React from "react";

const ScrollableArea = ({ height, children }) => {
  return <div style={{ maxHeight: height, overflowY: "auto" }}>{children}</div>;
};

export default ScrollableArea;
