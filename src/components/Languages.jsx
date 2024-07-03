
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
     <div className="flex gap-3 flex-wrap">
          <>
        {
        buttonss.map((name)=>{
          return(
            <>
            <button className=" border-2 pl-14 pr-14 p-2 w-[200px] hover:bg-[#4CAF50] hover:text-white hover:border-none rounded-xl" >{name.names}</button>
            </>
          ) 
        })
      }
      </>
        </div>
    
  
   
    </>
  )
}

export default Languages
