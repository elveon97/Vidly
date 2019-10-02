import React from "react";

const ListGroup = props => {
  const { items, active, onClick, textProperty, valueProperty } = props;

  if (items.length === 0) return null;

  let jsxItems = [];
  for (let item of items) {
    jsxItems.push(
      <li
        key={item[valueProperty]}
        className={"list-group-item" + (active === item._id ? " active" : "")}
        onClick={() => onClick(item._id)}
      >
        {item[textProperty]}
      </li>
    );
  }

  return <ul className="List-group">{jsxItems.map(item => item)}</ul>;
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
};

export default ListGroup;
