import { Link } from "react-router-dom";
import { useUser } from "../UserContext";

const TopNav = () => {
  const { user, logout } = useUser();

  return (
    <nav className="navbar navbar-expand-md navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Movflix
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-md-end"
          id="navbarNav"
        >
          <ul className="navbar-nav text-center">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            {user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">
                    Profile
                  </Link>
                </li>
                {user.admin && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin">
                      Admin Panel
                    </Link>
                  </li>
                )}
                <li className="nav-item">
                  <button className="nav-link" onClick={logout}>
                    Log-out
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default TopNav;
