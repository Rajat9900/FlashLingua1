

const Topics = () => {
  return (
    <div className="flex justify-center">
      <div className="flex  flex-col gap-4 text-center w-[37%] justify-center items-center h-[100vh]">
        <h4 className="text-[#4CAF50]"> You Rock !</h4>
        <p>our teachers thank you! Here are more cards, and as a bonus, you can click on categories to learn by topic.</p>
        <div className=" w-full  flex justify-evenly gap-5">
          <button className="hover:bg-[#4CAF50] hover:text-white w-full pt-2 pb-2  rounded-xl border-[[#E6E6E6] border-2 hover:border-none">150 more</button>
          <button className="hover:bg-[#4CAF50] hover:text-white w-full pt-2 pb-2 rounded-xl border-[[#E6E6E6] border-2 hover:border-none"> Topics</button>
        </div>
      </div>
    </div>
  )
}

export default Topics
