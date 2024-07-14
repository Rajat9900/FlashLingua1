import { useState, useEffect, useRef } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { getallCards, getCard, getFilteredCards } from "../../../services";
import './ImagesCSS.css';
import defaultImg from './pic25.png';
import Waveform from "./Waveform";
import audio from "../../assets/quothello-therequot-158832.mp3"
import { HiOutlineArrowNarrowLeft, HiArrowNarrowRight } from "react-icons/hi";


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
  const [showcard, setShowcard] = useState([]);
  const [isshowcard, setIshowcard] = useState(false);
  const [prevcard, setPrevcard] = useState(false);
  const [nextcard, setNextcard] = useState(false);
  const [fileurl, setFileurl] = useState('https://www.mfiles.co.uk/mp3-downloads/franz-schubert-standchen-serenade.mp3');


  const [isFlipped, setFlipped] = useState('');
  const [flipped, setFFlipped] = useState(Array(items.length).fill(false));

  const flipCard = (index) => {
    setFFlipped((prevFlipped) => {
      const newFlipped = [...prevFlipped];
      newFlipped[index] = !newFlipped[index];
      return newFlipped;
    });
  };

  const getAPiToken = localStorage.getItem("token");

  useEffect(() => {
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
  }, []);


  const showCard = (id) => {
    getCard(getAPiToken, id).then(res => {
      console.log(res, "data");
      setShowcard(res.data.cards);
      setNextcard(res.data.next);
      setPrevcard(res.data.prev);
      setIshowcard(true);

      // setFileurl(res.data.cards.targetAudio);



    }).catch(err => {
      console.error("Error fetching data:", err);
    });
  }


  return (
    <div className="flex justify-center">
      {!isshowcard && <div className="flex flex-col gap-1 w-[70%] items-center mb-2 mt-2">
        <p>View Cards</p>
        <div className="flex flex-col p-10  w-full bg-[#FAFAFA] rounded-2xl border-dashed border-[#FAFAFA] border-2">
          <p>Words</p>
          <div className="grid mt-5">
            {items.map((item, index) => (
              <div key={index} className="cell" onClick={() => showCard(item._id)}>{item.sourceText}</div>

            )
            )}
          </div>
        </div>
      </div>}
      {isshowcard && <div className="flex flex-col gap-1 w-[70%] items-center mb-2 mt-2">
        <p>Hello! Welcome</p>
        <p>In {showcard.sourceLang}</p>
        <p>{showcard.sourceText}</p>
        {showcard.illustration != null &&
          <img src={showcard.illustration} className="crd_img" />
        }
        {showcard.illustration == null &&
          <img src={defaultImg} className="crd_img" />
        }
        <p>In {showcard.targetLang}</p>
        <p>{showcard.targetText}</p>

        {fileurl != null &&
          <div className="flex flex-col gap-1 w-[70%] items-center mb-2 mt-2">
            <Waveform url={showcard.targetAudio} />

            <div className="w-[60%] flex justify-evenly gap-3 mt-3">
              <button onClick={() => showCard(prevcard)} disabled={prevcard == null} className="hover:bg-[#4CAF50] hover:text-white w-full flex pt-2 pb-2 rounded-xl border-[#E6E6E6] border-2 hover:border-none gap-2 justify-center">
                <span className="mt-1">
                  <HiOutlineArrowNarrowLeft />
                </span>
                Back
              </button>
              <button onClick={() => showCard(nextcard)} disabled={nextcard == null} className="hover:bg-[#4CAF50] hover:text-white w-full flex pt-2 pb-2 rounded-xl border-[#E6E6E6] border-2 hover:border-none gap-2 justify-center">
                Next
                <span className="mt-1">
                  <HiArrowNarrowRight />
                </span>
              </button>
            </div>

          </div>}
      </div>}



    </div>
  );
};

export default Cards;
