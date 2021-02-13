import { useParams } from "react-router-dom";
import { AddToCart } from '../buttons/AddToCart';
import './ItemDetail.css'

const ItemDetail = (props) => {
  const {inventory} = props;
  const {id} = useParams();
  console.log(id, inventory);
  let items = inventory.filter(item => item.id === Number(id));
  const item = items[0];

  return (
    <div className="item-container">
      <div className="image">
        <img src={item.img} alt={item.name}/>
      </div>
      <div className="item-description">
        <h1>{item.name}</h1>
        <p>${item.price}</p>
        <AddToCart />
      </div>
    </div>
  );
}

export default ItemDetail;