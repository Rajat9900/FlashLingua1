
const Languages = () => {
    const buttons = [
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
    <div>
      {
        buttons.map((name)=>{
            <div>{name.names}</div>
        })
      }
    </div>
    <div><span>All languages</span></div>
   <div>
    <button>Back</button>
    <button>Next</button>
   </div>
    </>
  )
}

export default Languages
