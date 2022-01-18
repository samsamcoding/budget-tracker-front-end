// Base Imports
import React, { useContext } from "react";

// Import nextJS Link component for navigating the client-side
import Link from "next/link";

// Import necessary bootstrap components
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";

// Import Icons
// import SettingsIcon from '@material-ui/icons/Settings';
// import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
// import IconButton from '@material-ui/core/IconButton';

// Import UserContext
import { UserContext } from "../UserContext";

export default function NavBar() {
  const { user } = useContext(UserContext);

  const profile = user.id ? (
    <>
      <img
        width="40"
        height="40"
        style={{ borderRadius: "100px", marginRight: "10px" }}
        src={user.avatar}
      />
      <Link href="/profile">
        <a className="nav-link text-white" role="button">
          {user.firstName}
        </a>
      </Link>
    </>
  ) : null;
 
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container fluid>
      {user.id !== null? (
        <Navbar.Brand href="/profile">Sulitipid</Navbar.Brand>
      ) : (
        <Navbar.Brand href="/">Sulitipid</Navbar.Brand>  
      )}
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav" >
      <Nav className="navbarText ml-auto">
                {user.id !== null ? (
                  <React.Fragment>
                  {profile}
                  <Link href="/logout">
                    <a className="nav-link text-white" role="button">
                      Logout
                    </a>
                  </Link>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Link href="/login">
                    <a className="nav-link text-white" role="button">
                      Login
                    </a>
                  </Link>
                  <Link href="/register">
                    <a className="nav-link text-white" role="button">
                      Register
                    </a>
                  </Link>
                </React.Fragment>
              )}
            </Nav>
      </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
