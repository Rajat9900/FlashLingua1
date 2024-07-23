import { useContext, useEffect, useState } from 'react';
import { Navbar, Nav, Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from "../../assets/main-logo.svg";
import styles from "./styles/style.module.css";
import { Link, useNavigate } from 'react-router-dom';
import { addSet } from '../../../services';
import { AppContext } from '../../context/appContext';

const Header = () => {
  const fontWeight600 = {
    fontWeight: "600"
  };

  let authenticator = false;

  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const context = useContext(AppContext)
  const toggleModal = () => setShowModal(!showModal);

  const navigate = useNavigate();
  const getToken = localStorage.getItem("token");

  useEffect(() => {
    // Any useEffect logic if needed
    console.log(context.token)
  }, [context]);

  const addSetApi = (data) => {
    console.log(data);
    addSet(data, getToken).then(res => {
      if (res.status === 201) {
        navigate('/setsPage');
        alert("Set added successfully.");
        context.setCardAdded(!context.cardAdded)
        setShowModal(false);
      }
    }).catch(err => {
      console.log(err);
    });
  };

  const handleLogout = () => {
    localStorage.clear()
    context.setToken(null)
    navigate('/')
  }
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary relative">
        <div className="container">
          <Navbar.Brand href="/">
            <img src={logo} className={styles.imgMargin} alt="Logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto" style={{ marginRight: "6%" }}>
              <Nav.Link style={fontWeight600} href="/">Home</Nav.Link>
              {(context.token !== null && context.token !== undefined) ? (
                <>
                  {/* <Nav.Link style={fontWeight600} href="#link">Teach</Nav.Link>
                  <Nav.Link style={fontWeight600} href="#home">Profile</Nav.Link> */}
                  {localStorage.getItem('email') == "tom@colorfulranch.com" &&
                    <>
                      <Nav.Link style={fontWeight600} href="#link">Add Flashcards</Nav.Link>
                      <Nav.Link style={fontWeight600} href="newCard">Add Cards</Nav.Link>
                      <Nav.Link style={fontWeight600} onClick={toggleModal} >Add Sets</Nav.Link>
                      <Nav.Link style={fontWeight600} href="#link">Rank</Nav.Link>
                    </>
                  }
                  <Nav.Link style={fontWeight600} href="/setsPage">sets</Nav.Link>
                  <Link to="/login"><button className={styles.logoBtn} type="button" onClick={handleLogout}>Logout</button></Link>

                </>
              ) : (
                <>


                  <Link to="/login"><button className={styles.logoBtn} type="button">Login</button></Link>

                </>
              )}


            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>

      <Modal show={showModal} onHide={toggleModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Set</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formSetName">
              <Form.Label>Set Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Write your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggleModal}>
            Close
          </Button>
          <Button className=' bg-[#4CAF50]' onClick={() => addSetApi({ name })}>
            Add Name
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Header;

