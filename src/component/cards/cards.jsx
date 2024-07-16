import { useState, useEffect, useRef } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { getallCards, getCard, getFilteredCards } from "../../../services";
import './ImagesCSS.css';
import defaultImg from './pic25.png';
import Waveform from "./Waveform";
import audio from "../../assets/quothello-therequot-158832.mp3"
import { HiOutlineArrowNarrowLeft, HiArrowNarrowRight } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";


const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 8,
  margin: `0 0 ${grid}px 0`,
  // change background colour if dragging
  background: isDragging ? "lightgreen" : "white",
  border: '5px solid lightgreen', // it is not work.
  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  display: 'flex',
  padding: grid,
  width: '100%',
  flexWrap: 'wrap'
});




const Cards = () => {
  const wavesurferRef = useRef(null);
  const [items, setItems] = useState([]);
  const navigate = useNavigate()
  const [showcard, setShowcard] = useState(0);
  const [isshowcard, setIshowcard] = useState(false);
  const [prevcard, setPrevcard] = useState(false);
  const [nextcard, setNextcard] = useState(false);
  const [fileurl, setFileurl] = useState('https://www.mfiles.co.uk/mp3-downloads/franz-schubert-standchen-serenade.mp3');


  const [isFlipped, setFlipped] = useState('');
  const [flipped, setFFlipped] = useState(Array(items.length).fill(false));
  const [isnorec, setIsnorec] = useState(false);

  const flipCard = (index) => {
    setFFlipped((prevFlipped) => {
      const newFlipped = [...prevFlipped];
      newFlipped[index] = !newFlipped[index];
      return newFlipped;
    });
  };

  const getAPiToken = localStorage.getItem("token");

  useEffect(() => {


  
  if(getAPiToken == null){
      navigate('/login');
  }



    localStorage.setItem('cardsLimit','');
    console.log(localStorage.getItem('selectedLanguage'))
    console.log(localStorage.getItem('selectedSecondLanguage'))
    const payload={
      "sourceLang":localStorage.getItem('selectedSecondLanguage'),
      "targetLang":localStorage.getItem('selectedLanguage')
    }
    getFilteredCards(payload).then(res => {
      console.log(res.data, "data");
      setItems(res.data);

      

    }).catch(err => {
      console.error("Error fetching data:", err);
    });

     console.log(localStorage.getItem('cardsLimit')+ 'bani');
  }, []);


  const showCard = (id,index,tp) => {
     const formData = new FormData()
      formData.append('cardid',id)
      formData.append('istype',tp);
      getCard(formData,getAPiToken).then(res => {

      if(res.data.isAllowed == 0){
        navigate('/payment');
      }
      console.log(res, "data");
      setShowcard(index);
      setFileurl(res.data.cards.targetAudio);

  
    }).catch(err => {
      console.error("Error fetching data:", err);
    });
  }


  return (
    <div className="flex justify-center ">

          {Object.keys(items).length == 0 && <div className="items-center mt-5"><h2>No Records</h2></div>}
  
            {items.map((item, index) => (
             <div className="flex flex-col pt-5">
               {index == showcard &&  <div className="flex flex-col items-center w-[100%]">
                <h2 className="p-2">Hello! Welcome</h2>
                <h3 className="m-2 greencolor">In {item.sourceLang}</h3>
                <p className="p-2">{item.sourceText}</p>
                {item.illustration != null &&
                  <img src={item.illustration} className="crd_img" />
                }
                {item.illustration == null &&
                  <img src={defaultImg} className="crd_img" />
                }
                <h3 className="m-2 greencolor">In {item.targetLang}</h3>
                <p className="p-2"> {item.targetText}</p>

                {fileurl != null &&
                  <div className="flex flex-col gap-1 w-[100%] items-center mb-2 mt-2">
                    <Waveform url={item.targetAudio} />

                    <div className="w-[100%] flex justify-evenly gap-3 mt-3">
                      <button onClick={() => showCard(items[index-1]._id,index-1,0)} disabled={items[index-1] == undefined} className={"hover:bg-[#4CAF50] hover:text-white w-full flex pt-2 pb-2 rounded-xl border-[#E6E6E6] border-2 hover:border-none gap-2 justify-center " + (items[index-1] == undefined ? 'd-none' : '')}>
                        <span className="mt-1">
                          <HiOutlineArrowNarrowLeft />
                        </span>
                        Back
                      </button>
                      <button onClick={() => showCard(items[index+1]._id,index+1,1)} disabled={items[index+1] == undefined} className={"hover:bg-[#4CAF50] hover:text-white w-full flex pt-2 pb-2 rounded-xl border-[#E6E6E6] border-2 hover:border-none gap-2 justify-center " + (items[index+1] == undefined ? 'd-none' : '')} >
                        Next
                        <span className="mt-1">
                          <HiArrowNarrowRight />
                        </span>
                      </button>
                    </div>

                  </div>}
             </div> }
             </div>

            )
            )}
          
     
    </div>
  );
};

export default Cards;
