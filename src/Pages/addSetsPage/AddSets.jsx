import { addGetSet } from "../../../services";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/appContext";
import { getViewCards } from "../../../services";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import './ImagesCSS.css';
 import defaultImg from './pic25.png';
const grid = 4;
 const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding:0,
  // change background colour if dragging
  background: isDragging ? "lightgreen" : "white",
   border: '2px solid #e5e7eb', /* border-gray-200 */
   margin: 4,
    borderRadius: '1rem', /* rounded-xl */
  // styles we need to apply on draggables
   boxShadow: '0px 10px 15px rgba(0, 0, 0, 0.1)', /* shadow-xl */
  ...draggableStyle,
});

const getListStyle = isDraggingOver => ({
  background: "white",
   border: '2px solid #e5e7eb', /* border-gray-200 */
    borderRadius: '1rem', /* rounded-xl */
  display: 'flex',
  padding: grid,
  width:'100%',
  padding:10,
  flexWrap:'wrap',

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
    <div className="flex">
     {!isShowcars && <div className="main-container w-[80%]">
        <div className="container"><h2 className="text-lg font-bold">Sets</h2></div>
        <div className=" flex justify-center ">
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

        {items.length == 0 && 
          <div className="flex">
          <div className="main-container mt-4">
           <button onClick={e => getback()} className=" bg-[#4CAF50] py-2 px-3 mt-5 mb-2  rounded-lg text-white">Back</button>
           </div>
          <div className="flex flex-col gap-1 w-[80%] text-center items-center mb-2 mt-2">
           
            <h3 className="text-center">No Records</h3>
          </div>
          </div>
        }

        {items.length > 0 && 
          <div>
            
            <button onClick={e => getback()} className=" bg-[#4CAF50] py-2 px-3  mb-2 rounded-lg text-white">Back</button>
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
                           {item?.flashcard?.illustration != null &&
                            <img className="h-150 w-auto rounded-xl" src={item.flashcard.illustration} />
                             }
                             {item.flashcard.illustration == null &&
                            <img className="h-150 w-auto rounded-xl" src={defaultImg} />
                             }
                          <h1 className="text-center mt-3">{item?.flashcard?.sourceText}</h1>
                            
                        </div>
                        <div className="flip-card-back">
                            {item?.flashcard?.illustration != null &&
                            <img className="h-150 w-auto rounded-xl" src={item.flashcard.illustration} />
                             }
                             {item.flashcard.illustration == null &&
                            <img className="h-150 w-auto rounded-xl" src={defaultImg}  />
                             }
                          <h1 className="text-center mt-3">{item?.flashcard?.targetText}</h1>
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
    </DragDropContext>
          </div>
        }
        </div>
      }
    </div>
  );
};

export default AddSets;
