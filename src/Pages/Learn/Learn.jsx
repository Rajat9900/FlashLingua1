import { Link } from "react-router-dom"

const Learn = () => {
  return (
    <div className=" flex justify-center ">
    <div className=" flex  flex-col gap-4 w-[30%] justify-center items-center h-[100vh]">
      <h5 className="">I want to</h5>
      <Link to='/tech' className=" p-2  w-full hover:bg-[#4CAF50] hover:border-2 solid hover:rounded-2xl hover:text-white font-bold">Learn a language</Link>
      <button className="p-2 w-full  hover:bg-[#4CAF50] hover:border-2 solid hover:rounded-2xl hover:text-white font-bold">Learn a language</button>
    </div>
    </div>
  )
}

export default Learn
