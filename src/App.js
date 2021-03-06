import { useEffect, useReducer, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ItemDetail from "./components/ItemDetail/ItemDetail";
import Cart from "./components/Cart/Cart";
import NavBar from "./components/NavigationBar/Navbar";
import Shop from "./components/Shop/Shop";
import inventory from "./Inventory/Inventory.js";
import "./App.css";

const updateCartItems = (state, action) => {
  console.log(state, action);
  const index = state.findIndex((cartItem) => {
    return cartItem.id === action.item.id;
  });

  switch (action.id) {
    case "add": {
      if (index === -1) {
        const item = { ...action.item, quantity: 1 };
        return [...state, item];
      } else {
        const newCart = state.map((cartItem, cartIndex) => {
          if (cartIndex === index) {
            return { ...cartItem, quantity: cartItem.quantity + 1 };
          }
          return cartItem;
        });
        return [...newCart];
      }
    }

    case "update": {
      let newCart = [];
      if (action.quantity === 0) {
        newCart = state.slice();
        newCart.splice(index, 1);
      } else {
        newCart = state.map((cartItem, cartIndex) => {
          if (cartIndex === index) {
            return { ...cartItem, quantity: action.quantity };
          }
          return cartItem;
        });
      }

      return [...newCart];
    }
    default:
      throw new Error("invalid action");
  }
};

const App = () => {
  const [cart, dispatch] = useReducer(updateCartItems, []);
  const [cartCount, setCartCount] = useState(cart);

  useEffect(() => {
    const count = cart.reduce((count, item) => {
      return count + item.quantity;
    }, 0);
    setCartCount(count);
  }, [cart]);

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <NavBar cartCount={cartCount} />
      <Switch>
        <Route exact path="/shop">
          <Shop inventory={inventory} />
        </Route>
        <Route exact path="/cart">
          <Cart
            cart={cart}
            updateCartQuantity={dispatch}
            cartCount={cartCount}
          />
        </Route>
        <Route exact path="/item/:id">
          <ItemDetail
            inventory={inventory}
            addItemToCart={(item) => dispatch({ id: "add", item: item })}
          />
        </Route>
        <Route exact path="/" component={Home} />
      </Switch>
    </Router>
  );
};

const Home = () => {
  return (
    <div className="homepage-wrapper">
      <div className="homepage">
        <h1>Dogs In Sweaters (Plus a Hat!)</h1>
        <Link to="/shop">
          <button type="button">Shop!</button>
        </Link>
      </div>
    </div>
  );
};

export default App;
