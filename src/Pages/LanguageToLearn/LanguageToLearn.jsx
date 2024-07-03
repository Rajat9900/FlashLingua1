import Languages from "../../components/Languages"


const LanguageToLearn = () => {
  return (
    <div className=" flex justify-center ">
      <div className="flex  flex-col gap-4  w-[40%] justify-center items-center h-[100vh] ">
        <p className="text-gray-400">Perfect! You want to learn</p>
        <h2 className="text-2xl text-[#4CAF50]">English</h2>
        <p className="">What is your native language?</p>
       <Languages/>
        
      </div>
    </div>
  )
}

export default LanguageToLearn
