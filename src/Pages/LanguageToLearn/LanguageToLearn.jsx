import { useContext, useState } from "react";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { HiArrowNarrowRight } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/appContext";

const LanguageToLearn = () => {
  const buttonss = [
    { names: "English" },
    { names: "Hindi" },
    { names: "Punjabi" },
    { names: "Spanish" },
    { names: "French" },
    { names: "Italian" },
    { names: "Japanese" },
    { names: "Chinese" },
    { names: "Portuguese" },
    { names: "German" },
    { names: "Greek" },
    { names: "Russian" },
  ]

  const navigate = useNavigate()

  function BacktoPrev() {
    navigate('/')
  }

  const [activeIndex, setActiveIndex] = useState(null);

  const context = useContext(AppContext)

  const handleButtons = (index) => {
    setActiveIndex(index);
    const selectedSecondLanguage = buttonss[index].names;
    localStorage.setItem("selectedSecondLanguage", selectedSecondLanguage);
    context.setNativeLanguage(selectedSecondLanguage)
  };
  const getItemFromLoal = localStorage.getItem("selectedLanguage")

  const BacktoLanguage = () => {
    const selectedLanguage = localStorage.getItem("selectedLanguage");
    console.log("Selected Language:", selectedLanguage);
    localStorage.setItem(selectedLanguage);
    navigate('/languagetoLearn');
  };

  function BacktoLanguageNaext() {
    const selectedLanguage = localStorage.getItem("selectedSecondLanguage");
    console.log("Selected Language:", selectedLanguage);
    navigate('/cards')
  }
  // localStorage.setItem(selectedLanguage);

  return (
    <div className=" flex justify-center mx-auto">
      <div className="flex  flex-col gap-4  w-[60%] sm-max:w-[90%] justify-center items-center  ">
        <p className="text-gray-400">Perfect! You want to learn</p>
        <h2 className="text-2xl text-[#4CAF50]">{getItemFromLoal}</h2>
        <p className="">What is your native language?</p>
        <div className="flex gap-3 flex-wrap justify-center ">
          {buttonss.map((name, index) => {
            const isActive = activeIndex === index
            return (
              <>
                <button

                  onClick={() => handleButtons(index)}
                  className={`border-2 pl-14 pr-14 p-2 w-[200px] sm-max:w-[100px]  text-center ${isActive ? "Active-btn" : ''} rounded-xl`}
                >
                  {name.names}
                </button>
              </>
            );
          })}
        </div>
        <div className=" flex gap-3  w-[60%] sm-max:!w-[74%] ">
          <div className=" text-right w-full  p-2 ">All languages</div>
          <select className=" flex  justify-between  w-full rounded-xl border-gray-200 border-2 pl-3 pr-3  items-center sm-max:pr-0" >
            <option value="Turkish">Turkish</option>
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
            <option value="Punjabi">Punjabi</option>
            <option value="French">French</option>
            <option value="Italian">Italian</option>
            <option value="Japanese">Japanese</option>
            <option value="Chinese">Chinese</option>

          </select>

        </div>
        <div className=" w-[60%]  flex justify-evenly gap-3">
          <button onClick={BacktoPrev} className="hover:bg-[#4CAF50] hover:text-white w-full flex pt-2 pb-2 rounded-xl border-[[#E6E6E6] border-2 hover:border-none gap-2 justify-center"><span className="mt-1" ><HiOutlineArrowNarrowLeft /></span>Back</button>
          <button onClick={BacktoLanguageNaext} className="hover:bg-[#4CAF50] hover:text-white w-full  flex pt-2 pb-2 rounded-xl border-[[#E6E6E6] border-2 hover:border-none  gap-2 justify-center">Next <span className="mt-1" ><HiArrowNarrowRight /></span></button>
        </div>

      </div>
    </div>
  )
}

export default LanguageToLearn
