import { IoIosArrowDown } from "react-icons/io";
const Languages = () => {
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
  return (
    <>
    <div className="flex gap-3 flex-wrap h-[100vh] ">
      {
        buttonss.map((name)=>{
          return(
            <>
            <button className=" border-2  pl-14 pr-14 w-[200px]  pt-2 pb-2 hover:bg-[#4CAF50] hover:text-white hover:border-none rounded-xl" >{name.names}</button>
            </>
          )
           
        })
      }
    </div>
    <div className=" flex gap-2  w-[80%]  ">
      <div className=" text-right w-full  p-2">All languages</div>
    <div className=" flex  justify-between  w-full rounded-xl border-gray-200 border-2 pl-3 pr-3  items-center">
     Turkish<span><IoIosArrowDown className="mt-1"/></span>
    </div>
    </div>
    <div className=" w-[80%]  flex justify-evenly gap-3">
          <button className="hover:bg-[#4CAF50] hover:text-white w-full pt-2 pb-2  rounded-xl border-[[#E6E6E6] border-2 hover:border-none">Back</button>
          <button className="hover:bg-[#4CAF50] hover:text-white w-full pt-2 pb-2 rounded-xl border-[[#E6E6E6] border-2 hover:border-none"> Next</button>
        </div>
    </>
  )
}

export default Languages
