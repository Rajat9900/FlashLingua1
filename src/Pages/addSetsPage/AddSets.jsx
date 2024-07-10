import { addGetSet } from "../../../services";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/appContext";

const AddSets = () => {
  const [characters, setCharacters] = useState([]);
  const context = useContext(AppContext)
  const getAPiToken = localStorage.getItem("token");

  useEffect(() => {
    addGetSet(getAPiToken).then(res => {
      console.log(res.data, "data"); 
      setCharacters(res.data);
    }).catch(err => {
      console.error("Error fetching data:", err); 
    });
  }, [context.cardAdded]); 

  return (
    <div className="flex justify-center">
      <div className="main-container mt-4">
        <div className="text-center">
          <h1 className="text-lg font-bold">Sets</h1>
        </div>
        <div className=" flex justify-center">
        <div className="flex flex-wrap gap-2 justify-between items-center w-[80%] ">
          {characters?.map((picture, index) => (
            <div key={index} className="group mt-4 h-[240px] w-[240px]  perspective-1000 bg-gray-200 flex justify-center items-center  rounded-lg">
              <div className=" flex flex-col gap-2">
                <h1 className="text-center  text-lg mt-7"> {picture.name}</h1>
               
                <button className=" bg-[#4CAF50] py-2 px-3 mt-5 rounded-lg text-white">Show Cards</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
};

export default AddSets;
