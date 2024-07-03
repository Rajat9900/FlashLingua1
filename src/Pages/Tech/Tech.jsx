// import { IoIosArrowDown } from "react-icons/io";
// import { Link } from "react-router-dom";

const Tech = () => {
  return (
    <div className="flex justify-center ">
        <div className="flex  flex-col gap-4 just   w-[30%] justify-center items-center h-[40vh] ">
      <h4 className="text-[#E6E6E6] font-">Teach</h4>
      <h4>I want to teach</h4>
      {/* <div className="p-2 w-full flex text-center justify-between hover:rounded-2xl border-[#E0E0E0] border-2 rounded-xl "> */}
      {/* <Link to='/pay'>Spanish </Link> */}


<select className=" w-full pl-3 pr-3 p-2 hover:rounded-2xl border-[#E0E0E0] border-2 rounded-lg " >
<option value="Spanish">Spanish</option>
<option value="English">English</option>
<option value="French">French</option>
<option value="Italian">Italian</option>
<option value="Japanese">Japanese</option>
<option value="Chinese">Chinese</option>

</select>


      {/* </div> */}
      
    </div>
    </div>
  )
}

export default Tech
