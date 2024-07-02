import { IoIosArrowDown } from "react-icons/io";

const Tech = () => {
  return (
    <div className="flex justify-center ">
        <div className="flex  flex-col gap-4 just   w-[30%] justify-center items-center h-[40vh] ">
      <h4 className="text-[#E6E6E6] font-">Teach</h4>
      <h4>I want to teach</h4>
      <div className="p-2 w-full flex text-center justify-between hover:rounded-2xl border-[#E0E0E0] border-2 rounded-xl ">
      <h4 >Spanish </h4>
<IoIosArrowDown className="mt-1"/>
      </div>
      
    </div>
    </div>
  )
}

export default Tech
