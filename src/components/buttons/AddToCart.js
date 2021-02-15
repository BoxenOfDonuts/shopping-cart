import './AddToCart.css';

export const AddToCart = (props) => {
  // props for instock / out of stock probably?
  const { addItemToCart } = props;
  
  return (
    <button className="add-to-cart" onClick={addItemToCart}>
      <i class="las la-lg la-shopping-cart"></i>
      <span className='button-padding'>Add To Cart</span>
      </button>
  );
}