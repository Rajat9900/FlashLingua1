
import { useForm } from "react-hook-form";
import { UserSignup } from "../../../services";
import { useNavigate } from "react-router-dom";


const Signup = () => {
   
  const { register, handleSubmit, formState: { errors },reset } = useForm();
 const navigate  = useNavigate()
  const onSubmit = (data) => {
    console.log(data);
    delete data['confirmPassword']
    UserSignup(data).then(res=>{
      if(res.status==201){
        alert("User Created Successfully")
        reset()
      navigate('/')
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
            className="col-md-5 m-auto py-5 mt-4 mb-4"
            style={{ border: "1px solid #E6E6E6", borderRadius: "20px" }}
          >
            <h2
              className="mb-5"
              style={{
                fontSize: "34px",
                fontWeight: "700",
                marginLeft: "66px",
              }}
            >
              Sign Up
            </h2>
            <form style={{ width: "80%", margin: "auto" }} onSubmit={handleSubmit(onSubmit)} >
              <div className="mt-3">
                <label
                  htmlFor="exampleInputPassword3"
                  style={{ fontWeight: "600" }}
                  className="form-label"
                >
                  Enter Your Name
                </label>
                <input
                  type="name"
                  style={{ border: "1px solid #E6E6E6", height: "52px" }}
                  className="form-control"
                  id="exampleInputPassword3"
                  {...register("name", { required: true })}
                  aria-invalid={errors.name ? "true" : "false"}
                />
                {errors.name?.type === "required" && (
                  <p role="alert" className="text-red-500">  name is required</p>
                )}
              </div>
              <div className="mt-3">
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
                  {...register("email", { required: "Email Address is required" })}
                  aria-invalid={errors.email ? "true" : "false"}
                />
                {errors.email && <p role="alert" className=" text-red-500">{errors.email.message}</p>}
              </div>
              <div className="mt-3">
                <label
                  htmlFor="exampleInputPassword2"
                  style={{ fontWeight: "600" }}
                  className="form-label"
                >
                  Password
                </label>
                <input
                  type="password"
                  style={{ border: "1px solid #E6E6E6", height: "52px" }}
                  className="form-control"
                  id="exampleInputPassword2"
                  maxLength={12} minLength={8}
                  {...register('password', { required: true })}
                />
                {errors.password?.type === "required" && (
                  <p role="alert" className=" text-red-500">Password is required</p>
                )}
              </div>

              <div className="mt-3">
                <label
                  htmlFor="exampleInputPassword5"
                  style={{ fontWeight: "600" }}
                  className="form-label"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  style={{ border: "1px solid #E6E6E6", height: "52px" }}
                  className="form-control"
                  id="exampleInputPassword5"
                  {...register('confirmPassword', { required: true })}
                />
                {errors.confirmPassword?.type === "required" && (
                  <p role="alert" className=" text-red-400">Password is required</p>
                )}
              </div>


              <button
                className="mb-5 btn m-auto mt-4"
                style={{
                  width: "100%",
                  color: "#4CAF50",
                  border: "1px solid #4CAF50",
                  height: "43px",
                  fontWeight: "700",
                  display: "block",
                  textAlign: "center",
                }}
                type="submit"

              >
                Create Account 
              </button>

            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
