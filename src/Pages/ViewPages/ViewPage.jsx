import {Link} from 'react-router-dom'
const ViewPage = () => {
    const Cards = [
        {names: "Coffee"},
        {names: "Eggs"},
        {names: "Wings"},
        {names: "Love"},
        {names: "World"},
        {names: "You"},
        {names: "Thing"},
        {names: "Memory"},
    ]
    const secondCards = [
        {namesInfo: "chuku"},{namesInfo: "chuku"},{namesInfo: "chuku"},{namesInfo: "chuku"},{namesInfo: "chuku"},{namesInfo: "chuku"},{namesInfo: "chuku"},{namesInfo: "chuku"},{namesInfo: "chuku"},{namesInfo: "chuku"},{namesInfo: "chuku"},{namesInfo: "chuku"},{namesInfo: "chuku"},{namesInfo: "chuku"},{namesInfo: "chuku"},{namesInfo: "chuku"},{namesInfo: "chuku"},{namesInfo: "chuku"},{namesInfo: "chuku"},{namesInfo: "chuku"},{namesInfo: "chuku"},{namesInfo: "chuku"},{namesInfo: "chuku"},{namesInfo: "chuku"},
    ]
  return (
    <div className=" flex justify-center ">
      <div className="flex  flex-col gap-4  w-[60%]  items-center mb-5 mt-20"> 
       <h2>View Cards</h2>
       <div>
       <div className=' flex justify-start mb-3 '> Words</div>
       
         <div className=' flex gap-3 flex-wrap justify-center '>

            {
                Cards.map((card)=>{
                    return(
                        <>
                        <Link to='' className=" border-2 pl-14 pr-14 p-2 w-[200px] hover:bg-[#4CAF50] text-center hover:text-white hover:border-none rounded-xl "  >{card.names}</Link>
                        </>
                    )
                })
            }
         </div>
         </div>
         <div>
            <h2 className=' text-left mb-3'>
                Cards with no words
            </h2>
            <div className='flex gap-3 flex-wrap justify-center'>
            {
           secondCards.map((secondCard)=>{
            return(
                <>
                 <button className="   border-2 pl-14 pr-14 p-2 w-[200px] hover:bg-[#4CAF50] text-white text-center hover:text-[#4CAF50] hover:border-none rounded-xl hover:text-[#4CAF50]">{secondCard.namesInfo}</button>
                </>
            )
           })
            }
            </div>
         </div>
      </div>
    </div>
  )
}

export default ViewPage
