import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../img/sweat-notes-logo.svg';

class Header extends Component {
  reanderNav() {
    switch(this.props.auth) {
      case null:
        return;
      case false:
        return (
          <ul className="nav-wrapper-links">
            <li><a href="/auth/google">Login with Google</a></li>
          </ul>
        )
      default:
        return (
          <ul className="nav-wrapper-links">
            <li>
              <Link to="/exercises/new">
                Add Exercises
              </Link>
            </li>
            <li>
              <a href="/api/logout">Logout</a>
            </li>
          </ul>
        )
    }
  }

  render() {
    return (
      <nav className="nav">
        <div className="nav-wrapper">
          <Link to={this.props.auth ? '/exercises' : '/'} className="nav-wrapper-logo">
            <img src={logo} alt="Sweat Notes" />
          </Link>
          {this.reanderNav()}
        </div>
      </nav>
    );
  }
};

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
