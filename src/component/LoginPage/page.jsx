import React, { useContext, useEffect } from 'react';
import Google from "../../assets/google.png";
import { FaArrowRight } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { DevTool } from '@hookform/devtools'
import { SocialLogin, userLogin, UserSignup } from "../../../services";
import { AppContext } from '../../context/appContext';



const Login = () => {
  const { register, formState: { errors }, handleSubmit } = useForm()
  const navigate = useNavigate()
  const context = useContext(AppContext)
  useEffect(() => {
    const initializeGoogleSignIn = () => {
      google.accounts.id.initialize({
        // client_id: '320095015258-gnjp46r8ca05hofucgdqp9pks7kk0rmi.apps.googleusercontent.com', // Replace with your actual Client ID
        client_id: '995931197559-2j4knhg95qbapup7gde5l8quba96jon7.apps.googleusercontent.com', // Replace with your actual Client ID
        callback: handleCredentialResponse,
      });
      google.accounts.id.renderButton(
        document.getElementById('signInDiv'),
        { width: 500 }
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
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join('')); 

    const user = JSON.parse(jsonPayload);
    console.log('User ID: ' + user.sub);
    console.log('Name: ' + user.name);
    console.log('Email: ' + user.email);
    console.log('Picture: ' + user.picture);
    handleSocialLogin(user)

    // Handle the sign-in process (e.g., send the token to your server)
  };

  const onSubmit = (data) => {
    console.log('data', data)
    userLogin(data).then(res => {
      if (res.status == 200) {
        localStorage.setItem("token", res.data.token)
        context.setToken(res.data.token)
        navigate('/')

      }
    }).catch(err => {
      console.log(err)
      alert(err.response.data.message)

    })
  }

  const handleSocialLogin = async (user) => {
    try {
      SocialLogin({ email: user.email, socialId: user.sub }).then(res => {
        if (res.status == 200) {
          console.log(res)
          console.log(res.data.isFirstTiime)
          if (res.data.data.isFirstTiime) {
            let data = {
              "name": user.name || "google",
              "email": user.email,
              "socialId": user.sub
            }
            UserSignup(data).then(res => {
              if (res.status == 201) {
                localStorage.setItem("token", res.data.token)
                context.setToken(res.data.token)
                navigate('/')
              }
            })
          } else {
            localStorage.setItem("token", res.data.data.token)
            context.setToken(res.data.data.token)
            console.log('else')
            navigate('/')
          }
        }
      })
    } catch (error) {
      console.log(error)
    }
  };



  return (
    <div className="container">
      <div className="row">
        <div className="col-md-5 m-auto border mt-5 mb-5" style={{ borderRadius: "20px" }}>
          <h1 className='text-center mt-4' style={{ fontWeight: "600", color: "#4CAF50" }}>You made it through 25 words</h1>
          <h1 className='text-center mt-4' style={{ fontWeight: "600" }}>Loving it? Register and Login now to enjoy more awesome features!</h1>
          <form className='m-auto' style={{ width: "80%" }} onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-3">
              <label htmlFor="exampleInputEmail2" style={{ fontWeight: "600" }} className="form-label">Email address</label>
              <input type="email" style={{ border: "1px solid #E6E6E6", height: "52px" }} className="form-control" id="exampleInputEmail2" placeholder='Figma design@gmail.com' aria-describedby="emailHelp" {...register('email', { required: "Email is required." })} />
              {errors.email && <span style={{ color: 'red' }}>{errors.email.message}</span>}
            </div>
            <div className="mt-3">
              <label htmlFor="exampleInputPassword1" style={{ fontWeight: "600" }} className="form-label">Password</label>
              <input type="password" style={{ border: "1px solid #E6E6E6", height: "52px" }} className="form-control" id="exampleInputPassword1" {...register('password', { required: "Password is required." })} />
              {errors.password && <span style={{ color: 'red' }}>{errors.password.message}</span>}
            </div>
            <div className="d-flex mt-3" style={{ justifyContent: "space-between" }}>
              <div className="mb-3 form-check">
                <input style={{ cursor: "pointer" }} type="checkbox" className="form-check-input" id="exampleCheck1" />
                <label style={{ fontWeight: "700", cursor: "pointer" }} className="form-check-label" htmlFor="exampleCheck1">Remember me</label>
              </div>
              <p style={{ fontWeight: "600", color: "#4CAF50", cursor: "pointer" }}>Forget Password?</p>
            </div>
            <button className="mt-3 btn" style={{ width: "100%", background: "#4CAF50", border: "none", height: "43px", color: "white" }} type="submit">Login</button>
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

          <div className='mt-4' style={{ display: "flex", margin: "auto", textAlign: "center", cursor: "pointer" }}>
            <div id="signInDiv" style={{ background: "white", margin: "auto", display: "flex", height: "43px", alignItems: "center" }}>
              <img src={Google} style={{ width: "27px", height: "26px" }} alt="" />
              <p style={{ fontWeight: "700", marginLeft: "20px" }}></p>
            </div>
          </div>
          <p className='text-center mt-4' style={{ fontWeight: "700" }}> Don&apos;t have a Google account? No worries</p>
          <Link to="/signup"><button className="mb-5 btn m-auto mt-4" style={{ color: "#4CAF50", border: "1px solid #4CAF50", height: "43px", fontWeight: "700", width: "80%", display: "block", textAlign: "center" }} type="submit"><span>Create Account</span> <span><FaArrowRight style={{ marginLeft: "70%", marginTop: "-18px" }} className='d-flex' /></span>
          </button></Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
