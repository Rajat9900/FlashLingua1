import { addGetSet } from "../../../services";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/appContext";
import { getViewCards } from "../../../services";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import './ImagesCSS.css';
 import defaultImg from './pic25.png';
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
  width:'100%',
  flexWrap:'wrap'
});


const AddSets = () => {
  const [characters, setCharacters] = useState([]);
  const context = useContext(AppContext)
  const getAPiToken = localStorage.getItem("token");
  const [items, setItems] = useState([]);
  const [isShowcars, setIsShowcars] = useState(false);
   const [isFlipped, setFlipped] = useState('');
    const [flipped, setFFlipped] = useState(Array(0).fill(false));

     const flipCard = (index) => {
    setFFlipped((prevFlipped) => {
      const newFlipped = [...prevFlipped];
      newFlipped[index] = !newFlipped[index];
      return newFlipped;
    });
  };

  


  useEffect(() => {
    addGetSet(getAPiToken).then(res => {
      console.log(res.data, "data"); 
      setCharacters(res.data);
    }).catch(err => {
      console.error("Error fetching data:", err); 
    });
  }, [context.cardAdded]);

  const getback = () => {
    setIsShowcars(false)
  } 

  const viewCards = (id) => {
    
    getViewCards(getAPiToken,id).then(res => {
      console.log(res.data.flashcards, "data"); 


      setItems(res.data.flashcards);
      setIsShowcars(true)
      
    }).catch(err => {
      console.error("Error fetching data:", err); 
    });
  }

  // a little function to help us with reordering the result
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    console.log( result);


    const reorderedItems = reorder(
      items,
      result.source.index,
      result.destination.index
    );

    setItems(reorderedItems);
  };

  return (
    <div className="flex justify-center">
     {!isShowcars && <div className="main-container mt-4">
        <div className="text-center">
          <h1 className="text-lg font-bold">Sets</h1>
        </div>
        <div className=" flex justify-center">
        <div className="flex flex-wrap gap-2 justify-between items-center w-[80%] ">
          {characters?.map((picture, index) => (
            <div key={index} className="group mt-4 h-[240px] w-[240px]  perspective-1000 bg-gray-200 flex justify-center items-center  rounded-lg">
              <div className=" flex flex-col gap-2">
                <h1 className="text-center  text-lg mt-7"> {picture.name}</h1>
                
                <button onClick={e => viewCards(picture._id)} className=" bg-[#4CAF50] py-2 px-3 mt-5 rounded-lg text-white">Show Cards</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div> }

      {isShowcars &&
        <div className="container"><h2>View Cards</h2>
<button onClick={e => getback()} className=" bg-[#4CAF50] py-2 px-3 mt-5 rounded-lg text-white">Back</button>
        <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable" direction="horizontal">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            {items.map((item, index) => (
              <Draggable key={item._id} draggableId={item._id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style
                    )}
                    
                     className={`flip-card  ${flipped[index] ? 'rotateY-180' : ''}`}
                         onClick={() => flipCard(index)}
                   
                  >
                <div className="flip-card-inner">
                        <div className="flip-card-front">
                            <div className="card-content">
                            {item?.flashcard?.illustration != null &&
                            <img src={item.flashcard.illustration} className="crd_img" />
                             }
                             {item.illustration == null &&
                            <img src={defaultImg} className="crd_img" />
                             }
                                
                                <h3>{item?.flashcard?.sourceText}</h3>
                            </div>
                            
                        </div>
                        <div className="flip-card-back">
                            <div className="card-content">
                            {item?.flashcard?.illustration != null &&
                            <img src={item.flashcard.illustration} className="crd_img" />
                             }
                             {item.illustration == null &&
                            <img src={defaultImg} className="crd_img" />
                             }
                               <h3> {item.flashcard.targetText}</h3>
                            </div>
                            
                        </div>
                    </div>
                   
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext></div>
      }
    </div>
  );
};

export default AddSets;
