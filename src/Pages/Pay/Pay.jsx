import { Link } from "react-router-dom"

const Pay = () => {
  return (
    <div className="flex justify-center"> 
      <div className="flex  flex-col gap-4 w-[39%] justify-center items-center h-[100vh]">
     <p className="text-[#4CAF50]">You made in through 25 words!!</p>
     <p className="">Enjoying the content? For the price of a latte,you can access even more cards! the teachers who create these cards receive 80% of the revenue.</p>
     <p>Support them to keep producing amazing material.</p>
     <Link to='/topics' className="bg-[#4CAF50] w-full text-center text-white pt-3 pb-3 rounded-xl">Pay $4.99</Link>
     <p>We use Stripe, o it is super easy!</p>
      </div>
    </div>
  )
}

export default Pay
