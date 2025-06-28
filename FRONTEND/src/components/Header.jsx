import { Link } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';
import { useNavigate } from 'react-router-dom';


function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">Artsian Hub Event Manager</Link>
        <nav>
          
          <ul className="nav-list">
             <li>
              {/* We shall add a link to the main Page here */}
              <Link to="/" className="nav-link">Home Page</Link>
            </li> 
            {/* <li>
              <Link to="/" className="nav-link">Events List</Link>
            </li> */}
            {/* <li>
              <Link to="/add" className="nav-link">Add Event</Link>
            </li> */}
            <li>
              <Link to="/contact" className="nav-link">Contact Us</Link>
            </li>
            <li>
              <Link to="/login" className="nav-link">Login</Link>
            </li>
          </ul>
          <p className="tagline">Event owners should add their events for public viewing</p>
        </nav>
      </div>
    </header>
  );
}

export default Header;