import { Link } from 'react-router-dom';
import './Navbar.css';

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
        <li className="flex-right">
          <Link to="/cart">Cart {content}</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;