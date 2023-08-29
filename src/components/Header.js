import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logoApp from '../assets/images/logo192.png';
import { NavLink, useNavigate,Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useContext, useState,useEffect } from "react"
import { UserContext } from '../context/UserContext';

function Header(props) {
  const navigate = useNavigate();
  const { logout, user } = useContext(UserContext);
  const [hideHeader,setHideHeader]=useState(false);

  // useEffect(() => {
  //   if(window.location.pathname==="/login")
  //   {
  //     setHideHeader(true)
  //   }
  // },[]);
  const handlelogout = () => {
    logout();
    toast.success("logout success!")
    navigate("/");
  }
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            src={logoApp}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
          <span>Admin</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        {(user&&user.auth||window.location.pathname==="/")&&
          <>
          <Nav className="me-auto" >
            <NavLink to="/" className="nav-link">Home</NavLink>
            <NavLink to="/users" className="nav-link">Users</NavLink>
            <NavLink to="/Test" className="nav-link">Test</NavLink>
          </Nav>
          <Nav>
          {user&&user.email&&<span className='nav-link'>Welcome {user.email}</span>}
            <NavDropdown title="Setting" >
              {user && user.auth == true ?
                <NavDropdown.Item onClick={() => handlelogout()}>Logout</NavDropdown.Item> :
                <NavLink to="/login" className="dropdown-item">login</NavLink>}
            </NavDropdown>
          </Nav>
          </>}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;