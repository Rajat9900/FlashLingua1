import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logoback from "../assets/main-logo.svg"

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
    <Navbar expand="lg" className="">
      <Container>
        <img src={logoback} alt="" style={{marginLeft:"5%"}}/>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto" style={{marginLeft:"49%"}}>
            <Nav.Link style={fontWeight600} href="#home">Home</Nav.Link>
            <Nav.Link  style={fontWeight600} href="#link">Add Flashcards</Nav.Link>
            <Nav.Link  style={fontWeight600} href="#home">Add cards</Nav.Link>
            <Nav.Link  style={fontWeight600} href="#link">Rank</Nav.Link>
            <button type="button" style={{background:"#4CAF50",width:"100px",height:"40px",borderRadius:"10px",marginLeft:"30px",color:"white"}}>Login</button>
           
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    </>
  )
}

export default Header