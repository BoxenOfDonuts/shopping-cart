const Cart  = (props) => {
  const { cart, updateCartQuantity } = props;
  const total = cart.reduce((accum, item) => {
    return accum + (item.quantity * item.price);
  }, 0)

  const items = cart.map(item => {
    return (
      <CartItem
        cartItem={item}
        updateCartQuantity={updateCartQuantity}
        key={item.id}
      />
    );
  })

  return (
    <>
      <h1>welcome to cart</h1>
      {items}
      <p className="total">Total: ${total}</p>
    </>
  );
}

const CartItem = (props) => {
  const { cartItem, updateCartQuantity } = props;

  const updateCart = (e) => {
    console.log(e.target.value,)
    updateCartQuantity({id: 'update', item: cartItem, quantity: Number(e.target.value)})
  }

  return (
    <div className="cart-item-container">
      <img src={cartItem.img} alt={cartItem.name}/>
      <div className="item-description">
          <h1>{cartItem.name}</h1>
          <p>${cartItem.price}</p>
          {/* <p>{cartItem.quantity}</p> */}
          {/* <input value={cartItem.quantity} type='number' min="0" onChange={(e) => updateCartQuantity({id: 'onChange', item: cartItem, quantity: Number(e.target.value)})} /> */}
          <Selection initialValue={cartItem.quantity} values={Array.from(Array(11)).map((value,index)=>index)} name={'quantity'} onChange={updateCart}/>
          {/* <button type='button' onClick={() => updateCartQuantity({id: 'increment', item: cartItem})}>+</button>
          <button type='button' onClick={() => updateCartQuantity({id: 'decrement', item: cartItem})}>-</button> */}
        </div>
    </div>
  );
}

const Selection = ({ initialValue, values, name, onChange }) => {
  return (
    <>
      <label htmlFor={name}></label>
      <select name={name} value={initialValue} onChange={onChange}>
        {values.map(value => {
          return <option value={value}>{value}</option>
        })}
      </select>
    </>
  );
}

export default Cart;