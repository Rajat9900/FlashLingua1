import Google from "../../assets/google.png";
import { FaArrowRight } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {DevTool} from '@hookform/devtools'
import { userLogin} from "../../../services";


const Login = () => {

  const { register,control, handleSubmit, formState:{errors} , reset} = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

const navigate = useNavigate()
    const login = async(data)=>{
      console.log(data);
      delete data['confirmPassword']
      userLogin(data).then(res=>{
        if(res.status==200){
          alert("User Login Successfully")
          reset()
          navigate('/mainPage')
        }
      }
      ).catch((err)=>{
        console.log(err);
      })
    }

  return (
    <>
      <div className="container">
        <div className="row">
          <div
            className="col-md-6 m-auto border mt-5 mb-5"
            style={{ borderRadius: "20px" }}
          >
            <h1
              className="text-center mt-5"
              style={{ fontWeight: "600", color: "#4CAF50" }}
            >
              You made it through 25 words
            </h1>
            <h1 className="text-center mt-4" style={{ fontWeight: "600" }}>
              Loving it ? Register and Login now to enjoy more awesome
              <br /> features!
            </h1>
            <form className="m-auto" style={{ width: "80%" }} onSubmit={handleSubmit(login)}  >
              <div className="mt-4">
                <label
                  htmlFor="exampleInputEmail1"
                  style={{ fontWeight: "600" }}
                  className="form-label"
                >
                  Email address
                </label>
                <input
                  type="email"
                  style={{ border: "1px solid #E6E6E6", height: "52px" }}
                  className="form-control"
                  id="exampleInputEmail1"
                  placeholder="Figma design@gmail.com"
                  aria-describedby="emailHelp"
                  
                 {...register('email',{required: "Email is required"})}
                 
                />
              {errors.password?.type === "required" && (
             <p role="alert">Email is required</p> )}
              </div>
              <div className="mt-4">
                <label
                  htmlFor="exampleInputPassword1"
                  style={{ fontWeight: "600" }}
                  className="form-label"
                >
                  Password
                </label>
                <input
                  type="password"
                  style={{ border: "1px solid #E6E6E6", height: "52px" }}
                  className="form-control"
                  id="exampleInputPassword1"
                  maxLength={12} minLength={8}
                  {...register('password' , {required: "password is required"})}
                   
                />
              {errors.password?.type === "required" && (
             <p role="alert">{errors.password?.message}</p>
      )}
              </div>
              <div
                className="d-flex mt-4"
                style={{ justifyContent: "space-between" }}
              >
                <div className="mb-3 form-check">
                  <input
                    style={{ cursor: "pointer" }}
                    type="checkbox"
                    className="form-check-input"
                    id="exampleCheck1"
                  />
                  <p>{errors.checkbox?.message}</p>
                  <label
                    style={{ fontWeight: "700", cursor: "pointer" }}
                    className="form-check-label"
                    htmlFor="exampleCheck1"
                  >
                    Remember me
                  </label>
                </div>
                <p
                  style={{
                    fontWeight: "600",
                    color: "#4CAF50",
                    cursor: "pointer",
                  }}
                >
                  Forgot Password?
                </p>
              </div>
              
                <button
                  className="mt-4 btn"
                  style={{
                    width: "100%",
                    background: "#4CAF50",
                    border: "none",
                    height: "43px",
                    color: "white",
                  }}
                  type="submit"
                  
                
                >
                  Login
                </button>
              
            </form>
            <DevTool control={control}/>
            <div className="position-relative">
              <hr className="mt-5" style={{ width: "80%", margin: "auto" }} />
              <p
                style={{
                  background: "white",
                  width: "fit-content",
                  position: "absolute",
                  top: "-13px",
                  left: "43%",
                  padding: "0 20px",
                  fontWeight: "500",
                  color: "#AFAFAF",
                }}
              >
                or login with
              </p>
            </div>

            <div
              className="mt-4"
              style={{
                width: "80%",
                display: "flex",
                margin: "auto",
                textAlign: "center",
                border: "1px solid #E6E6E6",
                borderRadius: "10px",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  width: "fit-content",
                  margin: "auto",
                  display: "flex",
                  height: "43px",
                  alignItems: "center",
                }}
              >
                <img
                  src={Google}
                  style={{ width: "27px", height: "26px" }}
                  alt=""
                />
                <p style={{ fontWeight: "700", marginLeft: "20px" }}>Google</p>
              </div>
            </div>
            <p className="text-center mt-4" style={{ fontWeight: "700" }}>
              Dont have a google account no worries
            </p>
            <Link to="/signup">
              <button
                className="mb-5 btn m-auto mt-4"
                style={{
                  color: "#4CAF50",
                  border: "1px solid #4CAF50",
                  height: "43px",
                  fontWeight: "700",
                  width: "80%",
                  display: "block",
                  textAlign: "center",
                }}
                type="submit"
                
              >
                <span>Create Account</span>
                <span>
                  <FaArrowRight
                    style={{ marginLeft: "65%", marginTop: "-18px" }}
                    className="d-flex"
                  />
                </span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
