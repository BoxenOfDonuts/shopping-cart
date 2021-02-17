import { Link } from "react-router-dom";
import "./Cart.css";

const Cart = (props) => {
  const { cart, cartCount, updateCartQuantity } = props;
  const total = cart.reduce((accum, item) => {
    return accum + item.quantity * item.price;
  }, 0);

  const items = cart.map((item) => {
    return (
      <CartItem
        cartItem={item}
        updateCartQuantity={updateCartQuantity}
        key={item.id}
      />
    );
  });

  return (
    <div className="cart-wrapper">
      <h1>Shopping Cart</h1>
      <div className="cart-header">
        {cartCount > 0 && <p className="price right-align">Price</p>}
      </div>
      {items}
      {cartCount > 0 && (
        <p className="total right-align">
          Total ({cartCount} items): <span className="bold">${total}</span>
        </p>
      )}
    </div>
  );
};

const CartItem = (props) => {
  const { cartItem, updateCartQuantity } = props;

  const updateCart = (e) => {
    console.log(e.target.value);
    updateCartQuantity({
      id: "update",
      item: cartItem,
      quantity: Number(e.target.value),
    });
  };

  return (
    <div className="cart-item-container">
      <div className="item-image">
        <Link to={`/item/${cartItem.id}`}>
          <img src={cartItem.img} alt={cartItem.name} />
        </Link>
      </div>
      <div className="cart-item-description">
        <h1>{cartItem.name}</h1>
        <Selection
          initialValue={cartItem.quantity}
          values={Array.from(Array(11)).map((value, index) => index)}
          name={"quantity"}
          onChange={updateCart}
        />
      </div>
      <div className="cart-item-price right-align">
        <p>${cartItem.price}</p>
      </div>
    </div>
  );
};

const Selection = ({ initialValue, values, name, onChange }) => {
  return (
    <>
      <p style={{ display: "inline" }}>{"Quantity "}</p>
      <label htmlFor={name}></label>
      <select name={name} value={initialValue} onChange={onChange}>
        {values.map((value) => {
          let postFix = "";
          if (value === 0) {
            postFix = " (Delete)";
          }
          return <option value={value}>{value + postFix}</option>;
        })}
      </select>
    </>
  );
};

export default Cart;
