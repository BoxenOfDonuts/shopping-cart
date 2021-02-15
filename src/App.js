import { useEffect, useReducer, useState } from 'react';
import { act } from 'react-dom/test-utils';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
} from 'react-router-dom';
import ItemDetail from './components/ItemDetail/ItemDetail';
import frency from './images/french-fries.jpg'
import leatherJacket from './images/leather-jacket.jpg';
import longSleeves from './images/long-sleeves.jpg';
import redTiger from './images/red-tiger.jpg';
import reindeer from './images/reindeer.jpg';
import yellowHat from './images/yellow-hat.jpg';

const inventory = [
  {
    id: 1,
    name: 'French Fry T-Shirt',
    img: frency,
    price: 35,
  },
  {
    id: 2,
    name: 'Leather Jacket',
    img: leatherJacket,
    price: 70,
  },
  {
    id: 3,
    name: 'Long Sleeve Sweatshirt',
    img: longSleeves,
    price: 55,
  },
  {
    id: 4,
    name: 'Red Tiger Stripe Onesie',
    img: redTiger,
    price: 45,
  },
  {
    id: 5,
    name: 'Rindeer Hat',
    img: reindeer,
    price: 15,
  },
  {
    id: 6,
    name: 'Yellow Knit Beanie',
    img: yellowHat,
    price: 30,
  },
]

const shoppingCart = [
  {
    id: 1,
    name: 'French Fry T-Shirt',
    img: frency,
    price: 35,
    quantity: 1
  },
  {
    id: 6,
    name: 'Yellow Knit Beanie',
    img: yellowHat,
    price: 30,
  },
]

const updateCartItems = (state, action) => {
  console.log(state, action);
  const index = state.findIndex(cartItem => {
    return cartItem.id === action.item.id
  })
  switch (action.id) {
    case 'add':
      if (index === -1) {
        const item  = {...action.item, quantity: 1}
        return [...state, item]
      }  else {
        const newCart = state.map((cartItem, cartIndex) => {
          if (cartIndex === index) {
            return {...cartItem, quantity: cartItem.quantity + 1}
          }
          return cartItem;
        })
        return [...newCart]
      }
      break;
  
    default:
      
      break;
  }
}

const App = () => {
  const [cart, dispatch] = useReducer(updateCartItems, [])
  const [ cartCount, setCartCount ] = useState(cart);

  useEffect(() => {
    const count = cart.reduce((count, item) => {
      return count + item.quantity;
    }, 0);
    setCartCount(count);

  }, [cart])

  return (
    <Router>
    <NavBar cartCount={cartCount} />
      <Switch>
        <Route exact path='/shop' component={Shop}/>
        <Route exact path='/cart' component={Cart}/>
        <Route exact path='/item/:id'>
          <ItemDetail
            inventory={inventory}
            addItemToCart={(item) => dispatch({id: 'add', item: item})}
          />
        </Route>
        <Route exact path='/' component={Home}/>
      </Switch>
    </Router>
  );
}


const NavBar = ({cartCount}) => {
  let content = '';

  if (cartCount && cartCount > 0) {
    content = `(${cartCount})`
  }

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/shop">Shop</Link>
        </li>
        <li>
          <Link to="/cart">Cart {content}</Link>
        </li>
      </ul>
    </nav>
  );
}


const Shop = () => {
  let items = inventory.map((item) => {
    return (
      <h1 key={item.id}>
        <Link to={`/item/${item.id}`} >
          {item.name}
        </Link>
      </h1>
    )
  })

  return (
    <>
      <h1>welcome to shop</h1>
      {items}
    </>
  );
}

const Home = () => {
  return (
    <h1>Welcome to home</h1>
  );
}

const Cart  = (props) => {
  const items = shoppingCart.map(item => {
    return (
      <>
        <CartItems
          cartItem={item}
        />
        <div className="item-description">
          <h1>{item.name}</h1>
          <p>${item.price}</p>
          <p>{item.quantity}</p>
          <button type='button'>+</button>
          <button type='button'>-</button>
        </div>
      </>
    );
  })

  return (
    <>
      <h1>welcome to cart</h1>
      {items}
    </>
  );
}

const CartItems = (props) => {
  const { cartItem } = props;

  return (
    <div className="cart-item-container">
      <img src={cartItem.img} alt={cartItem.name}/>
    </div>
  );
}

export default App;