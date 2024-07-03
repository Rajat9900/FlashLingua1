import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from "../../assets/main-logo.svg"
import styles from "./styles/style.module.css"
import 'bootstrap/dist/css/bootstrap.min.css';



const Footer = () => {
    const fontWeight600={
        fontWeight:"600"
    }


  return (
    <>
<div className="container border mt-20" >
    <div className="row  p-5">
        <div className="col-lg-9">
        <img src={logo} alt="not loading"  />
        <div className={styles.dfb} style={{marginTop:"18px"}}>
            <Nav.Link style={fontWeight600} className={styles.footerText} href="mainPage">Home</Nav.Link>
            <Nav.Link  style={fontWeight600} className={styles.footerText} href="#link">Add Flashcards</Nav.Link>
            <Nav.Link  style={fontWeight600} className={styles.footerText} href="#home">Add cards</Nav.Link>
            <Nav.Link  style={fontWeight600} className={styles.footerText} href="#link">Rank</Nav.Link>
        </div>

        </div>

            <div className="col-lg-3">
           <p className={styles.stayText}>Stay up to date</p> 
          
<div className="mt-3">
    <div className={styles.dfb}>
    <input type="email" class="form-control" id="exampleInputEmail1" placeholder='Enter your Email' aria-describedby="emailHelp"/>
    <button className={styles.subcribeBtn} type="button" style={{background:"#4CAF50",width:"150px",height:"40px",borderRadius:"10px",marginLeft:"30px",color:"white"}}>Subscribe</button>  
    </div>
</div>

 </div>
    </div>
</div> 
          
    
    </>
  )
}

export default Footer