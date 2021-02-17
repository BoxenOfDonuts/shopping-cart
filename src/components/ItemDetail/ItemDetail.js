import { useParams } from "react-router-dom";
import { AddToCart } from "../buttons/AddToCart";
import React from 'react';
import "./ItemDetail.css";

const ItemDetail = (props) => {
  const { inventory } = props;
  const { id } = useParams();
  let items = inventory.filter((item) => item.id === Number(id));
  const item = items[0];

  const getItem = () => {
    props.addItemToCart(item);
  };

  return (
    <div className="item-container">
      <div className="image">
        <img src={item.img} alt={item.name} />
      </div>
      <div className="item-description">
        <h1>{item.name}</h1>
        <p>${item.price}</p>
        <AddToCart addItemToCart={getItem} />
      </div>
    </div>
  );
};

export default React.memo(ItemDetail, (prev, next) => {
  console.log(prev.inventory)
  return prev.inventory === next.inventory;
});
