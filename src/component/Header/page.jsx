// import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav} from 'react-bootstrap';
import logo from "../../assets/main-logo.svg"
// import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "./styles/style.module.css"
// import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const Header = () => {

  const [token, setToken] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    
    setToken(storedToken);

  }, []);

  console.log(token);
  
 const fontWeight600={
      fontWeight:"600"
  }

  let authenticator = false


const LogoutFunctionality=()=>{

  navigate('/');

 setToken(null)

console.log("after logout",token);
}

// console.log(token);

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
      <Nav.Link style={fontWeight600} href="mainPage">Home</Nav.Link>
       {
        authenticator === true ?  
        (
          <>
              <Nav.Link  style={fontWeight600} href="#link">teach</Nav.Link>
              <Nav.Link  style={fontWeight600} href="#home">Profile</Nav.Link>   
          </>
        ) : (
          <>
            <Nav.Link  style={fontWeight600} href="#link">Add Flashcards</Nav.Link>
          <Nav.Link  style={fontWeight600} href="newCard">Add cards</Nav.Link>
          <Nav.Link  style={fontWeight600} href="#link">Rank</Nav.Link>    
          </>
        )
       }
           
         <Link to="/"><button className={styles.logoBtn} type="button" >{token !==null ? (<h1 onClick={LogoutFunctionality}>Logout</h1>)  :  "Login"}</button></Link>
      </Nav>
    </Navbar.Collapse>
  </div>
</Navbar>
    </>

  )
}

export default Header