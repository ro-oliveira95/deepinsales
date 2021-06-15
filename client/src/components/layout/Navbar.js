import { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import logo from "../../img/logo.png";

function Navbar({ auth: { isAuthenticated, loading }, logout }) {
  const location = useLocation().pathname;
  const authLinks = (
    <ul>
      <li>
        <a onClick={logout} href='#!'>
          <i className='fas fa-sign-out-alt' />{" "}
          <span className='hide-sm'>Sair</span>
        </a>
      </li>
    </ul>
  );
  const guestLinks = (
    <ul>
      <li>
        <Link to='/login'>Login</Link>
      </li>
      <li>
        <Link to='/registrar'>Registrar</Link>
      </li>
    </ul>
  );

  return (
    <nav
      className={`navbar ${location === "/dashboard" && "navbar-transposed"}`}
    >
      {location !== "/dashboard" ? (
        <Link to='/' className='logo-container'>
          <img src={logo} alt='logo' className='logo-s' />
          <h3>Deep in Sales</h3>
        </Link>
      ) : (
        <Fragment>
          <img src={logo} alt='logo' className='logo-m' />
        </Fragment>
      )}

      {!loading && (
        <Fragment> {isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
