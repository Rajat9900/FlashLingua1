import Photo3 from '../../assets/Photo3.png'
import { IoMicOutline } from "react-icons/io5";
import { MdArrowOutward } from "react-icons/md";
const Phrase = () => {
  return (
    <div className="flex justify-center flex-col items-center mt-8 ">
        <div className=' flex gap-1'>
        Click on <span className=" font-bold">Add<span className=" text-[#4CAF50]"> Flash</span> Cards</span>or<span className=" font-bold">Add Cards</span><span className='text-[#4CAF50]'>< MdArrowOutward className=' mt-1 font-extrabold'/></span>
        </div>
      <div className=" flex  flex-col gap-4 w-[30%] justify-center items-center h-[80vh]">
       <img src={Photo3} alt="text"/>
       <p className='text-left'>Write a phrase</p>
       <input type="text" placeholder="having fun on the trampoline " className='w-full pt-2 pb-2 pl-6 rounded-lg '/>
       <div className='w-full bg-[#4CAF50] text-center text-white pt-2 pb-2 rounded-2xl flex gap-1 justify-center'>
        <button className="">Record</button>
        <IoMicOutline  className='size-6'/>
       </div>
       
      </div>
    </div>
  )
}

export default Phrase
