import Languages from "../../components/Languages"


const MainPage = () => {
  return (
    <div className=" flex justify-center ">
      <div className="flex  flex-col gap-4 just   w-[50%] justify-center items-center h-[100vh] ">
        <h3 className="text-[#E6E6E6]">Welcome!</h3>
        <p className=" text-center">Our goal is to make learning a language fun,simple and intuitive.Lovingly created by teachers who are language enthusiats</p>
        <p className="text-[#4CAF50]">Which language would you like to learn?</p>
        <Languages/>
        
       
      </div>
    </div>
  )
}

export default MainPage
