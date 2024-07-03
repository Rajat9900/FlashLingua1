// import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import logo from "../../assets/main-logo.svg"
// import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "./styles/style.module.css"
// import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const Header = () => {
  const logostyle={
    width:"200px"
  }
  const logostyle2={
    width:"58px"
  }
 const fontWeight600={
      fontWeight:"600"
  }

  return (
     <>
      <Navbar expand="lg" className="bg-body-tertiary">
  <div className="container">
    <Navbar.Brand href="#home">
      <img src={logo} className={styles.imgMargin}  alt="" />
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ms-auto" style={{marginRight:"6%"}} >
      <Nav.Link style={fontWeight600} href="#home">Home</Nav.Link>
            <Nav.Link  style={fontWeight600} href="#link">Add Flashcards</Nav.Link>
            <Nav.Link  style={fontWeight600} href="#home">Add cards</Nav.Link>
            <Nav.Link  style={fontWeight600} href="#link">Rank</Nav.Link>
         <Link to="/login">   <button className={styles.logoBtn} type="button" >Login</button></Link>
      </Nav>
    </Navbar.Collapse>
  </div>
</Navbar>
    </>

  )
}

export default Header