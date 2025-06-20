import { Link } from 'react-router-dom';


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
            <li>
              <Link to="/" className="nav-link">Events List</Link>
            </li>
            <li>
              <Link to="/add" className="nav-link">Add Event</Link>
            </li>
          </ul>
          <p className="tagline">Event owners should add their events for public viewing</p>
        </nav>
      </div>
    </header>
  );
}

export default Header;