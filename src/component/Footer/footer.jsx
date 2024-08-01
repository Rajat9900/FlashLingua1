// import React from 'react'
// import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from "../../assets/main-logo.svg"
import styles from "./styles/style.module.css"
import 'bootstrap/dist/css/bootstrap.min.css';



const Footer = () => {
    const fontWeight600 = {
        fontWeight: "600"
    }


    return (
        <>
            <div className="container !mx-auto border mt-20 sm-max:w-[90%] sm-max:mx-auto md-range:!w-[99%] w-[99%] max-w-[5000px]" >
                <div className="row ">
                    <div className="col-lg-9 sm-max:text-center sm-max:justify-center sm-max:flex sm-max:flex-col">
                        <img src={logo} alt="not loading" className='sm-max:w-[50%] sm-max:mx-auto' />
                        <div className={`${styles.dfb} `} style={{ marginTop: "18px" }}>
                            <Nav.Link style={fontWeight600} className={`${styles.footerText} md-range:!ml-0 lg-range:!ml-0`} href="mainPage">Home</Nav.Link>
                            <Nav.Link style={fontWeight600} className={styles.footerText} href="#link">Add Flashcards</Nav.Link>
                            <Nav.Link style={fontWeight600} className={styles.footerText} href="#home">Add cards</Nav.Link>
                            <Nav.Link style={fontWeight600} className={styles.footerText} href="#link">Rank</Nav.Link>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <p className={` ${styles.stayText} sm-max:text-center`}>Stay up to date</p>

                        <div className="mt-3 sm-max:text-center">
                            <div className={styles.dfb}>
                                <input type="email" className="form-control" id="exampleInputEmail1" placeholder='Enter your Email' aria-describedby="emailHelp" />
                                <button className={`${styles.subcribeBtn} lg-range:!w-[170px]`} type="button" style={{ background: "#4CAF50", width: "150px", height: "40px", borderRadius: "10px", marginLeft: "30px", color: "white" }}>Subscribe</button>
                            </div>
                        </div>

                    </div>
                    <div className='d-flex flex-row justify-between md-range:flex md-range:flex-row md-range:justify-between sm-max:flex sm-max:!flex-col lg-range:mt-[-20px]'>
                    <div className="col-lg-9 mt-5 sm-max:text-center sm-max:mb-[-20x]">
                        <p>	&copy; starfish aaps.All right reserved</p>
                    </div>
                    <div className="col-lg-3 mt-5 ">
                        <ul className='d-flex sm-max:justify-center '>
                            <li className='lg-range:ml-[18px]'>About</li>
                            <li style={{ marginLeft: "15px" }}>Terms</li>
                            <li style={{ marginLeft: "15px" }}>Privacy</li>
                            <li style={{ marginLeft: "15px" }}>cookies</li>
                        </ul>
                    </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer