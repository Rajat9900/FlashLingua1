import React, { useEffect } from 'react';
import Google from "../../assets/google.png";
import { FaArrowRight } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import axios from 'axios';


const Login = () => {
  useEffect(() => {
    const initializeGoogleSignIn = () => {
      google.accounts.id.initialize({
        client_id: '320095015258-gnjp46r8ca05hofucgdqp9pks7kk0rmi.apps.googleusercontent.com', // Replace with your actual Client ID
        callback: handleCredentialResponse,
      });
      google.accounts.id.renderButton(
        document.getElementById('signInDiv'),
        { width: 500}
      );
    };

    const loadGoogleAPI = () => {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = initializeGoogleSignIn;
      document.body.appendChild(script);
    };

    loadGoogleAPI();
  }, []);

  const handleCredentialResponse = (response) => {
    const jwtToken = response.credential;
    console.log('JWT Token: ' + jwtToken);

    // Decode the JWT token manually
    const base64Url = jwtToken.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    const user = JSON.parse(jsonPayload);
    console.log('User ID: ' + user.sub);
    console.log('Name: ' + user.name);
    console.log('Email: ' + user.email);
    console.log('Picture: ' + user.picture);
    handleSocialLogin(user);
    // Handle the sign-in process (e.g., send the token to your server)
  };

  const onSubmit=(data)=>{
      console.log('data',data)
      userLogin(data).then(res=>{
        if(res.status==200){
          localStorage.setItem("token" , res.data.token)
          navigate('/mainPage')

        }
      }).catch(err=>{
        console.log(err)
        alert(err.response.data.message)
        
      })
  }

const handleSocialLogin = async (user) => {
  try {
    const response = await axios.post('https://a4fe-2401-4900-1c6e-686a-b08e-afa8-2f8b-1f21.ngrok-free.app/users/social-login', {
      email: user.email,
      socialId: user.sub,
      // name: user.name || 'Google User'
    });

    if (response.status === 201 || response.status === 200) {
      const { isFirstTime } = response.data;
      if (isFirstTime) {
        console.log('User created successfully');
      } else {
        console.log('User logged in successfully');
      }
      navigate('/mainPage');
    }
  } catch (error) {
    console.error('Error during social login:', error);
  }
};



  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 m-auto border mt-5 mb-5" style={{ borderRadius: "20px" }}>
          <h1 className='text-center mt-5' style={{ fontWeight: "600", color: "#4CAF50" }}>You made it through 25 words</h1>
          <h1 className='text-center mt-4' style={{ fontWeight: "600" }}>Loving it? Register and Login now to enjoy more awesome<br /> features!</h1>
          <form className='m-auto' style={{ width: "80%" }}>
            <div className="mt-4">
              <label htmlFor="exampleInputEmail2" style={{ fontWeight: "600" }} className="form-label">Email address</label>
              <input type="email" style={{ border: "1px solid #E6E6E6", height: "52px" }} className="form-control" id="exampleInputEmail2" placeholder='Figma design@gmail.com' aria-describedby="emailHelp" />
            </div>
            <div className="mt-4">
              <label htmlFor="exampleInputPassword1" style={{ fontWeight: "600" }} className="form-label">Password</label>
              <input type="password" style={{ border: "1px solid #E6E6E6", height: "52px" }} className="form-control" id="exampleInputPassword1" />
            </div>
            <div className="d-flex mt-4" style={{ justifyContent: "space-between" }}>
              <div className="mb-3 form-check">
                <input style={{ cursor: "pointer" }} type="checkbox" className="form-check-input" id="exampleCheck1" />
                <label style={{ fontWeight: "700", cursor: "pointer" }} className="form-check-label" htmlFor="exampleCheck1">Remember me</label>
              </div>
              <p style={{ fontWeight: "600", color: "#4CAF50", cursor: "pointer" }}>Forget Password?</p>
            </div>
            <Link to='/mainPage'><button className="mt-4 btn" style={{ width: "100%", background: "#4CAF50", border: "none", height: "43px", color: "white" }} type="submit">Login</button></Link>
          </form>
          <div style={{ textAlign: "center", position: "relative" }}>
            <hr className='mt-5' style={{ width: "80%", margin: "auto" }} />
            <p
              style={{
                backgroundColor: "white",
                width: "fit-content",
                marginTop: "-13px",
                padding: "0 20px",
                fontWeight: "500",
                color: "#AFAFAF",
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)"
              }}
            >
              or login with
            </p>
          </div>

          <div className='mt-4' style={{  display: "flex", margin: "auto", textAlign: "center",cursor: "pointer" }}>
            <div id="signInDiv" style={{  background:"white", margin: "auto", display: "flex", height: "43px", alignItems: "center" }}>
              <img src={Google} style={{ width: "27px", height: "26px" }} alt="" />
              <p style={{ fontWeight: "700", marginLeft: "20px" }}></p>
            </div>
          </div>
          <p className='text-center mt-4' style={{ fontWeight: "700" }}>Don't have a Google account? No worries</p>
          <Link to="/signup"><button className="mb-5 btn m-auto mt-4" style={{ color: "#4CAF50", border: "1px solid #4CAF50", height: "43px", fontWeight: "700", width: "80%", display: "block", textAlign: "center" }} type="submit"><span>Create Account</span> <span><FaArrowRight style={{ marginLeft: "62%", marginTop: "-18px" }} className='d-flex' /></span>
          </button></Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
