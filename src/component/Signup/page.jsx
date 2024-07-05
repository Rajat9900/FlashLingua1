import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";


const Signup = () => {
  const { register, handleSubmit, formState:{errors}} = useForm({
    defaultValues: {
      name : "",
      email: "",
      password: "",
      
    },
  });
  const onSubmit = (data) => console.log(data.data)

  return (
    <>
      <div className="container">
        <div className="row">
          <div
            className="col-md-6 m-auto py-5 mt-4 mb-4"
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
              <div className="mt-4">
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
                  {...register("firstName", { required: true })}
                  aria-invalid={errors.firstName ? "true" : "false"}
                />
                {errors.firstName?.type === "required" && (
        <p role="alert"> name is required</p>
      )}
              </div>
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
                  {...register("mail", { required: "Email Address is required" })}
                  aria-invalid={errors.mail ? "true" : "false"}
                />
                {errors.mail && <p role="alert">{errors.mail.message}</p>}
              </div>
              <div className="mt-4">
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
                  {...register('password' , {required: true})}
                />
                  {errors.password?.type === "required" && (
                <p role="alert">Password is required</p>
      )}
              </div>

              <div className="mt-4">
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
                />
              </div>

              <Link to="/">
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
                  Create Acount
                </button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
