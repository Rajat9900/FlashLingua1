import { useState, useEffect, useRef, useCallback } from "react";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { getallCards, getCard, getFilteredCards } from "../../../services";
import './ImagesCSS.css';
import defaultImg from './pic25.png';
import Waveform from "./Waveform";
import Wavesourceform from "./Wavesourceform";
// import audio from "../../assets/quothello-therequot-158832.mp3"
import { HiOutlineArrowNarrowLeft, HiArrowNarrowRight } from "react-icons/hi";
import { Link, useNavigate,useLocation } from "react-router-dom";
import Loader from "../Loader/Loader";
// import { getFilteredCards } from "../../../services";


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
  const location = useLocation();
  const [items, setItems] = useState([]);
  const navigate = useNavigate()
  const [showcard, setShowcard] = useState(0);
  const [isshowcard, setIshowcard] = useState(false);
  const [prevcard, setPrevcard] = useState(false);
  const [nextcard, setNextcard] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fileurl, setFileurl] = useState('https://www.mfiles.co.uk/mp3-downloads/franz-schubert-standchen-serenade.mp3');
   const [currentAudioUrl, setCurrentAudioUrl] = useState(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [sourceFileurl, setSourceFileurl] = useState('https://www.mfiles.co.uk/mp3-downloads/franz-schubert-standchen-serenade.mp3');

  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [audioLoaded, setAudioLoaded] = useState(false);
  const [hasPlayedOnLoad, setHasPlayedOnLoad] = useState(false);
   const [playAudio, setPlayAudio] = useState(false);
  const audioRef = useRef(new Audio());
  const audioElement = audioRef.current;

  useEffect(() => {
    // Clean up when component unmounts
    return () => {
      audioElement.pause();
      audioElement.src = '';
      audioElement.removeEventListener('canplaythrough', handleLoadedMetadata);
    };
  }, [audioElement]);

  const handleLoadedMetadata = useCallback(() => {
    setIsAudioPlaying(true);
    audioElement.play().catch((error) => {
      console.error('Error playing audio:', error);
    });
  }, [audioElement]);

  const setAudioUrl = useCallback(
    (audioUrl) => {
      setCurrentAudioUrl(audioUrl);
      audioElement.src = audioUrl;
      audioElement.currentTime = 0;
      audioElement.addEventListener('canplaythrough', handleLoadedMetadata, { once: true });
    },
    [audioElement, handleLoadedMetadata]
  );

  const playAudioFunc = useCallback(() => {
    if (audioElement && items.length > 0) {
      const { sourceAudio,targetAudio } = items[currentCardIndex] || {};

      if (targetAudio && audioLoaded) {
        setAudioUrl(targetAudio);
        setHasPlayedOnLoad(true);
      } else {
        console.error('Audio URL is undefined or not loaded for the current card.');
      }
    }
  }, [audioElement, items, currentCardIndex, audioLoaded, setAudioUrl]);


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
    setIsLoading(true);
    getFilteredCards(payload).then(res => {
      console.log(res.data, "data");
      setItems(res.data);
      setIsLoading(false);
      console.log(location.state);
      if(location.state != null){
        const {cardIdRec} = location.state; 
        if(cardIdRec.curindex < res.data.length){
          setShowcard(cardIdRec.curindex);

        }
        
      }

       //navigate(location.state, {}); 

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

      // if(res.data.isAllowed == 0){
        //navigate('/payment');
      // }
      console.log(res, "data");
      setShowcard(index);
      setFileurl(res.data.cards.targetAudio);
      setSourceFileurl(res.data.cards.sourceAudio);
  
    }).catch(err => {
      console.error("Error fetching data:", err);
    });
  }

  const useCard = (id,ind) => {
    navigate('/newCard/', { state: {cardIdRec: {id: id,nextindex: ind}} });
  }

  const switchCard = (dd,ind) => {

    let neArr = {};
    neArr._id = dd._id
    neArr.illustration = dd.illustration;
    neArr.isOfficial = dd.isOfficial;
    neArr.sourceAudio = dd.targetAudio;
    neArr.targetAudio = dd.sourceAudio;
    neArr.sourceLang = dd.targetLang;
    neArr.targetLang = dd.sourceLang;
    neArr.sourceText = dd.targetText;
    neArr.targetText = dd.sourceText
    neArr.__v = dd.__v;

    const newData = items.slice(ind);

    newData[ind] = neArr;

    setItems(newData);
     setShowcard(ind);
    
    
  }

  const handlePlayButtonClick = () => {
    if (items.length > 0 && items[showcard].targetAudio) {
      setPlayAudio(true);
      setAudioUrl(items[showcard].targetAudio);
    }
  };

  var UniqeKeyVarible = 1;
  return (
    <div className="flex justify-center ">
    <div className="justify-center ">
          {Object.keys(items).length == 0 && <div className="items-center mt-5"><h2>No Records</h2></div>}
  
            {items.map((item, index) => (
             <div className="flex flex-col pt-5 mx-auto">
               {index == showcard &&  <div className="flex flex-col items-center w-[100%]">
                <h2 className="p-2">Hello! Welcome</h2>
                <h3 className="m-2 greencolor">In {item.sourceLang}</h3>
                <p className="p-2">{item.sourceText}</p>
                 {sourceFileurl != null &&
                  <div className="flex flex-col gap-1 w-[100%] items-center m-4">
                    {item.sourceAudio != null   && (
                      <audio key={item.sourceAudio} controls={true}>
                        <source src={item.sourceAudio} type="audio/ogg" />
                        Your browser does not support the audio element.
                      </audio>
                    )}
                    </div>
                }

                {item.illustration != null &&
                  <img src={item.illustration} className="crd_img" />
                }
                {item.illustration == null &&
                  <img src={defaultImg} className="crd_img" />
                }
                <h3 className="m-2 greencolor">In {item.targetLang}</h3>
                <p className="p-2"> {item.targetText}</p>

                
                  <div className="flex flex-col gap-1 w-[100%] items-center m-4">
                   
                    
                      <audio key={item.targetAudio} controls={true} preload="auto" autoPlay>
                        <source src={item.targetAudio} type="audio/ogg" />
                        Your browser does not support the audio element.
                      </audio>
                    
                    </div>
               

               

                <div className="flex flex-col gap-1 w-[100%] items-center mb-2 mt-2">

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


                  </div>
                <div className="flex flex-col gap-1 w-[100%] items-center mb-2 mt-2">

                    <div className="w-[100%] flex-col flex justify-evenly gap-3 mt-3">
                      <button onClick={() => useCard(items[index]._id,index+1)} className="hover:bg-[#4CAF50] hover:text-white w-full flex pt-2 pb-2 rounded-xl border-[#E6E6E6] border-2 hover:border-none gap-2 justify-center" >
                        Use Card
                        
                      </button>
                       <button onClick={() => switchCard(items[index],index)} className="hover:bg-[#4CAF50] hover:text-white w-full flex pt-2 pb-2 rounded-xl border-[#E6E6E6] border-2 hover:border-none gap-2 justify-center" >
                        SwitchCard
                        
                      </button>
                    </div>
                    

                  </div>
             </div> }
             </div>

            )
            )}
          
     {isLoading &&  <Loader /> }
    </div>
    </div>
  );
};

export default Cards;
