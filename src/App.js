import { useEffect, useState } from 'react';
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

const App = () => {
  return (
    <Router>
    <NavBar />
      <Switch>
        <Route exact path='/shop' component={Shop}/>
        <Route exact path='/cart' component={Cart}/>
        <Route exact path='/item/:id'>
          <ItemDetail inventory={inventory} />
        </Route>
        <Route exact path='/' component={Home}/>
      </Switch>
    </Router>
  );
}


const NavBar = () => {
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
          <Link to="/cart">Cart</Link>
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
      <CartItems
        cartItem={item}
      />
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