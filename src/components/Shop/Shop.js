import { Link } from 'react-router-dom';
import './Shop.css';

const Shop = ({inventory}) => {
  let items = inventory.map((item) => {
    return (
        <Link to={`/item/${item.id}`} className='shop-item'>
          <img src={item.img} alt={item.name}/>
          <p>{item.name}</p>
        </Link>
    )
  })

  return (
    <>
      {/* <h1>welcome to shop</h1> */}
      <div className='shop-wrapper'>
        {items}
      </div>
    </>
  );
}

export default Shop;