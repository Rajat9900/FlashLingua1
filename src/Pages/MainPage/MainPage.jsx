import { useState } from "react";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { HiArrowNarrowRight } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
const MainPage = () => {
  const buttonss = [
    { names: "English" },
    { names: "Spanish" },
    { names: "French" },
    { names: "Italian" },
    { names: "Japanese" },
    { names: "Chinese" },
    { names: "Portuguese" },
    { names: "German" },
    { names: "Greek" },
    { names: "Russian" },
  ];
  const navigate = useNavigate()
  
    function BacktoMain(){
      navigate('/')
    }
    function BacktoLanguage(){
      navigate('/languagetoLearn')
    }

    const [activeIndex, setActiveIndex] = useState(null);

    const handleButtons = (index) => {
      setActiveIndex(index);
    };
  return (
    <div className=" flex justify-center ">
      <div className="flex  flex-col gap-4   w-[60%] justify-center items-center h-[100vh] ">
        <h3 className="text-[#E6E6E6]">Welcome!</h3>
        <p className=" text-center">
          Our goal is to make learning a language fun,simple and
          intuitive.Lovingly created by teachers who are language enthusiats
        </p>
        <p className="text-[#4CAF50]">
          Which language would you like to learn?
        </p>
        <div className="flex gap-3 flex-wrap">
          {buttonss.map((name,index) => {
            const isActive = activeIndex===index
            return (
              <>
                <button id={`btn-${index}`}
                  onClick={()=>handleButtons(index)}
                  className={`border-2 pl-14 pr-14 p-2 w-[200px]  text-center ${isActive?"Active-btn":''} rounded-xl`}
                >
                  {name.names}
                </button>
              </>
            );
          })}
        </div>

        <div className=" flex gap-3  w-[60%]  ">
          <div className=" text-right w-full  p-2">All languages</div>{" "}
          <select className=" flex  justify-between  w-full rounded-xl border-gray-200 border-2 pl-3 pr-3  items-center">
            <option value="Turkish">Turkish</option>
            <option value="English">English</option>
            <option value="French">French</option>
            <option value="Italian">Italian</option>
            <option value="Japanese">Japanese</option>
            <option value="Chinese">Chinese</option>
          </select>
        </div>
        <div className=" w-[60%]  flex justify-evenly gap-3">
          <button onClick={BacktoMain} className="hover:bg-[#4CAF50] hover:text-white w-full flex pt-2 pb-2 rounded-xl border-[[#E6E6E6] border-2 hover:border-none gap-2 justify-center">
            <span className="mt-1">
              <HiOutlineArrowNarrowLeft />
            </span>
            Back
          </button>
          <button onClick={BacktoLanguage} className="hover:bg-[#4CAF50] hover:text-white w-full  flex pt-2 pb-2 rounded-xl border-[[#E6E6E6] border-2 hover:border-none  gap-2 justify-center">
            Next{" "}
            <span className="mt-1">
              <HiArrowNarrowRight />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
