import { Link } from "react-router-dom"

const Signup = () => {
  return (
    <>
    <div className="container">
        <div className="row">
            <div className="col-md-6 m-auto">

    <form  style={{width:"80%"}} >
    <div className="mt-4">
    <label for="exampleInputPassword3"  style={{fontWeight:"600"}} className="form-label">Enter Your Name</label>
    <input type="name"  style={{border:"1px solid #E6E6E6",height:"52px"}}  className="form-control" id="exampleInputPassword3"/>
  </div>
  <div className="mt-4">
    <label for="exampleInputPassword4"  style={{fontWeight:"600"}} className="form-label">Enter Your username</label>
    <input type="name"  style={{border:"1px solid #E6E6E6",height:"52px"}}  className="form-control" id="exampleInputPassword4"/>
  </div>
    <div className="mt-4">
    <label for="exampleInputEmail1"  style={{fontWeight:"600"}} className="form-label">Email address</label>
    <input type="email" style={{border:"1px solid #E6E6E6",height:"52px"}} className="form-control" id="exampleInputEmail1" placeholder='Figma design@gmail.com' aria-describedby="emailHelp"/>
  </div>
  <div className="mt-4">
    <label for="exampleInputPassword2"  style={{fontWeight:"600"}} className="form-label">Password</label>
    <input type="password"  style={{border:"1px solid #E6E6E6",height:"52px"}}  className="form-control" id="exampleInputPassword2"/>
  </div>

  <div className="mt-4">
    <label for="exampleInputPassword5"  style={{fontWeight:"600"}} className="form-label">Confirm Password</label>
    <input type="password"  style={{border:"1px solid #E6E6E6",height:"52px"}}  className="form-control" id="exampleInputPassword5"/>
  </div>

    <Link to='/'><button className="mb-5 btn m-auto mt-4" style={{width:"100%",color:"#4CAF50",border:"1px solid #4CAF50",height:"43px",fontWeight: "700",display:"block",textAlign:"center"}} type="submit" >Create Acount</button></Link>


    </form>
    
    </div>
    </div>
    </div>
    
    
    </>
  )
}

export default Signup