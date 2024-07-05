

import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { HiArrowNarrowRight } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";

const LanguageToLearn = () => {
  const buttonss = [
    {names: "English"},
    {names: "Spanish"},
    {names: "French"},
    {names: "Italian"},
    {names: "Japanese"},
    {names: "Chinese"},
    {names: "Portuguese"},
    {names: "German"},
    {names: "Greek"},
    {names: "Russian"},
]

const navigate = useNavigate()

  function BacktoPrev(){
    navigate('/mainPage')
  }
  function BacktoLanguageNaext(){
    navigate('/language2')
  }
  return (
    <div className=" flex justify-center ">
      <div className="flex  flex-col gap-4  w-[60%] justify-center items-center h-[100vh] ">
        <p className="text-gray-400">Perfect! You want to learn</p>
        <h2 className="text-2xl text-[#4CAF50]">English</h2>
        <p className="">What is your native language?</p>
        <div className="flex gap-3 flex-wrap">
          {buttonss.map((name) => {
            return (
              <>
                <Link
                  to="/languagetoLearn"
                  className=" border-2 pl-14 pr-14 p-2 w-[200px] hover:bg-[#4CAF50] hover:text-white text-center hover:border-none rounded-xl"
                >
                  {name.names}
                </Link>
              </>
            );
          })}
        </div>
        <div className=" flex gap-3  w-[60%]  ">
      <div className=" text-right w-full  p-2 ">All languages</div>
    <select className=" flex  justify-between  w-full rounded-xl border-gray-200 border-2 pl-3 pr-3  items-center" >
<option value="Turkish">Turkish</option>
<option value="English">English</option>
<option value="French">French</option>
<option value="Italian">Italian</option>
<option value="Japanese">Japanese</option>
<option value="Chinese">Chinese</option>

</select>
  
    </div>
    <div className=" w-[60%]  flex justify-evenly gap-3">
          <button onClick={BacktoPrev} className="hover:bg-[#4CAF50] hover:text-white w-full flex pt-2 pb-2 rounded-xl border-[[#E6E6E6] border-2 hover:border-none gap-2 justify-center"><span className="mt-1" ><HiOutlineArrowNarrowLeft /></span>Back</button>
          <button onClick={BacktoLanguageNaext} className="hover:bg-[#4CAF50] hover:text-white w-full  flex pt-2 pb-2 rounded-xl border-[[#E6E6E6] border-2 hover:border-none  gap-2 justify-center">Next <span className="mt-1" ><HiArrowNarrowRight/></span></button>
        </div>
        
      </div>
    </div>
  )
}

export default LanguageToLearn
