import Languages from "../../components/Languages"


const MainPage = () => {
  return (
    <div className=" flex justify-center ">
      <div className="flex  flex-col gap-4 just   w-[30%] justify-center items-center h-[100vh] ">
        <h3 className="text-[#E6E6E6]">Welcome!</h3>
        <p>Our goal is to make learning a language fun,simple and intuitive.Lovingly created by teachers who are language enthusiats</p>
        <p className="text-[#4CAF50]">Which language would you like to learn?</p>
        <Languages/>
        
        <div><span>All language</span><input type="text"/></div>
        <div>
            <button>Back</button>
            <button>Next</button>
        </div>
      </div>
    </div>
  )
}

export default MainPage
