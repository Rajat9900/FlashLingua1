import { useState  , useRef} from "react";
import pic1 from "../../assets/pic1.png";
import pic2 from "../../assets/pic2.png";
import pic3 from "../../assets/pic3.png";
import pic4 from "../../assets/pic4.png";
import pic from "../../assets/pic.png";
import pic5 from "../../assets/pic5.png";
import pic6 from "../../assets/pic6.png";
import pic7 from "../../assets/pic7.png";
import pic8 from "../../assets/pic8.png";
import pic9 from "../../assets/pic9.png";
import pic10 from "../../assets/pic10.png";
import pic11 from "../../assets/pic11.png";
import pic12 from "../../assets/pic12.png";
import pic13 from "../../assets/pic13.png";
import pic14 from "../../assets/pic14.png";
import pic15 from "../../assets/pic15.png";
import pic17 from "../../assets/pic17.png";
import pic18 from "../../assets/pic18.png";
import pic19 from "../../assets/pic19.png";
import pic20 from "../../assets/pic20.png";
import pic22 from "../../assets/pic22.png";
import pic23 from "../../assets/pic23.png";
import pic24 from "../../assets/pic24.png";
import pic25 from "../../assets/pic25.png";

import './Styles/ImagesCSS.css';

const Images = () => {
  const [people , setPeople] = useState([
    { name: "Idea", pic: pic },
    { name: "Reading a journal", pic: pic1 },
    { name: "Having fun", pic: pic2 },
    { name: "Running", pic: pic3 },
    { name: "Relaxing", pic: pic4 },
    { name: "Planning", pic: pic5 },
    { name: "Checking the mail", pic: pic6 },
    { name: "Skydiving", pic: pic7 },
    { name: "Investment", pic: pic8 },
    { name: "Recycling", pic: pic9 },
    { name: "Imagination", pic: pic10 },
    { name: "Relaxing", pic: pic11 },
    { name: "Relaxing", pic: pic12 },
    { name: "Virtual Reality", pic: pic13 },
    { name: "Sick", pic: pic14 },
    { name: "Question", pic: pic15 },
    { name: "Relaxing", pic: pic18 },
    { name: "Working", pic: pic20 },
    { name: "Unity", pic: pic23 },
    { name: "Food", pic: pic17 },
    { name: "Relaxing", pic: pic19 },
    { name: "Store", pic: pic22 },
    { name: "Wild Life", pic: pic24 },
    { name: "Stepping out", pic: pic25 },
    { name: "Creativity", pic: pic14 },
  ]);
const dragPerson = useRef(0)
const  draggedOverPerson = useRef (0)  
function handleSort(){
const peopleClone = [...people]
const temp = peopleClone[dragPerson.current];
peopleClone[dragPerson.current] = peopleClone[draggedOverPerson.current]
peopleClone[draggedOverPerson.current] = temp
setPeople(peopleClone)
}
  const [flipped, setFlipped] = useState(Array(people.length).fill(false));

  const flipCard = (index) => {
    setFlipped((prevFlipped) => {
      const newFlipped = [...prevFlipped];
      newFlipped[index] = !newFlipped[index];
      return newFlipped;
    });
  };




  return (
    <div className="flex justify-center">
      <div className="main-cointainer">
        <div className="text-center">
          <h1>Images</h1>
        </div>
        <div className="flex flex-wrap justify-between items-center w-full">
          {people.map((picture, index) => (
            <div key={index} className="group h-240 w-240 mt-4 perspective-1000" 
            draggable
            onDragStart={() => (dragPerson.current = index)}
            onDragEnter={() => (draggedOverPerson.current = index)}
            onDragEnd={handleSort}
            onDragOver={(e) => e.preventDefault()}
            >
              <div
                className={`flip ${flipped[index] ? 'rotateY-180' : ''}`}
                onClick={() => flipCard(index)}
              >
                <div className="flip-front">
                  <img className="h-150 w-auto rounded-xl" src={picture.pic} alt={picture.name} />
                  <h1 className="text-center mt-3">{picture.name}</h1>
                </div>
                <div className="flip-back">
                  <div className="flex min-h-full flex-col justify-center">
                    <h1>amet consectetur adipisicing elit. Expedita, aspernatur.</h1>
                    <h1>Lorem, ipsum dolor.</h1>
                    <h1>ratione id perspiciatis assumenda est.</h1>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Images;

