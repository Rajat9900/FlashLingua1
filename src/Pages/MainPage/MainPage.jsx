import { useContext, useState, useEffect } from "react";
import { HiOutlineArrowNarrowLeft, HiArrowNarrowRight } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/appContext";

const MainPage = () => {
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
    { names: "Urdu" },
    { names: "German" },
    { names: "Greek" },
    { names: "Russian" },
  ];

  const navigate = useNavigate();

  const [activeIndex, setActiveIndex] = useState(null);
  const context = useContext(AppContext)


  const getAPiToken = localStorage.getItem("token");

  useEffect(() => {



    if (getAPiToken == null) {
      navigate('/login');
    }
  })


  const handleButtons = (index) => {
    setActiveIndex(index);
    const selectedLanguage = buttonss[index].names;
    localStorage.setItem("selectedLanguage", selectedLanguage);
    context.setLanguageToLearn(selectedLanguage)

  };

  const BacktoMain = () => {
    navigate('/');
  };

  const BacktoLanguage = () => {
    const selectedLanguage = localStorage.getItem("selectedLanguage");
    console.log("Selected Language:", selectedLanguage);
    navigate('/languagetoLearn');
  };

  return (
    <div className="flex justify-center  !mx-auto">
      <div className="flex flex-col gap-4 w-[60%] justify-center items-center mt-16">
        <h3 className="text-[#E6E6E6]">Welcome!</h3>
        <p className="text-center">
          Our goal is to make learning a language fun, simple, and intuitive. Lovingly created by teachers who are language enthusiasts.
        </p>
        <p className="text-[#4CAF50] sm-max:!text-center">
          Which language would you like to learn?
        </p>
        <div className="flex gap-3 flex-wrap md-range:justify-around lg-range:justify-center sm-max:justify-center">
          {buttonss.map((name, index) => {
            const isActive = activeIndex === index;
            return (
              <button
                key={index}
                id={`btn-${index}`}
                onClick={() => handleButtons(index)}
                className={`border-2 pl-14 pr-14 p-2 w-[200px] sm-max:!max-w-[95px] text-center ${isActive ? "Active-btn" : ''} rounded-xl`}
              >
                {name.names}
              </button>
            );
          })}
        </div>
        <div className="flex justify-evenly gap-3 sm-max:!mx-auto items-center md-range:flex md-range:justify-center md-range:!ml-[65px] lg-range:!ml-[65px]">
          <div className="w-full flex sm-max:pt-2 justify-center px-14 sm-max:!px-0 h-[44px] md-range:!w-[200px] md-range:!px-0 md-range:pt-2 md-range:!justify-start lg-range:!w-[200px] lg-range:!px-0 lg-range:pt-2 lg-range:!justify-start xl-range:w-[320px] xl-range:items-center">All languages</div>
          <select className="flex w-full   rounded-xl border-[#E6E6E6] border-2 hover:border-none px-1 justify-center sm-max:!w-[100px] sm-max:!px-0 h-[44px] md-range:!px-0 lg-range:!px-0">
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
        <div className=" flex justify-evenly gap-3 sm-max:!mx-auto">
          <button onClick={BacktoMain} className="hover:bg-[#4CAF50] hover:text-white w-full flex pt-2 pb-2 rounded-xl border-[#E6E6E6] border-2 hover:border-none  justify-center sm-max:!w-[100px]  px-14 sm-max:!px-0">
            <span className="mt-1">
              <HiOutlineArrowNarrowLeft />
            </span>
            Back
          </button>
          <button onClick={BacktoLanguage} className="hover:bg-[#4CAF50] hover:text-white w-full flex pt-2 pb-2 rounded-xl border-[#E6E6E6] border-2 hover:border-none px-14 justify-center sm-max:!w-[100px] sm-max:!px-0">
            Next
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
