import { addGetSet } from "../../../services";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/appContext";
import { getViewCards,updateCardsOrder,deletedbCard } from "../../../services";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import EditModal  from "./EditModal";
  
import './ImagesCSS.css';
import defaultImg from './pic25.png';
const grid = 4;
const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: 0,
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
  width: '100%',
  padding: '20px 58px',
  flexWrap: 'wrap',
  gap: '10px',
  justifyContent: 'center',
});


const AddSets = () => {
  const [characters, setCharacters] = useState([]);
  const context = useContext(AppContext)
  const getAPiToken = localStorage.getItem("token");
  const [flashcards, setFlashcards] = useState([]);
  const [isShowcars, setIsShowcars] = useState(false);
  const [isFlipped, setFlipped] = useState('');
  const [flipped, setFFlipped] = useState(Array(0).fill(false));
  const navigate = useNavigate()
  const [activeset,setActiveset] = useState(null)
const [showModal, setShowModal] = useState(false);
     const flipCard = (index) => {
    setFFlipped((prevFlipped) => {
      const newFlipped = [...prevFlipped];
      newFlipped[index] = !newFlipped[index];
      return newFlipped;
    });
  };




  useEffect(() => {

    if (getAPiToken == null) {
      navigate('/login');
    }



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
    // isCloseM();
    setActiveset(id);
    getViewCards(getAPiToken, id).then(res => {
      console.log(res.data.flashcards, "data");

      let cardsArr = res.data.flashcards;

      cardsArr.sort((a, b) => a.order - b.order)


      setFlashcards(cardsArr);
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
    if (!result.destination) return;

    const items = Array.from(flashcards);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setFlashcards(items);

    // Update order on the backend
    const newOrder = items.map((item, index) => ({
      flashcardId: item.flashcard._id,
      order: index + 1
    }));


    updateCardsOrder(getAPiToken, newOrder, activeset).then(res => {


    }).catch(err => {
      console.error("Error fetching data:", err);
    });



    const reorderedItems = reorder(
      flashcards,
      result.source.index,
      result.destination.index
    );

    setFlashcards(reorderedItems);
  };

  const editCard = (id) => {
      setShowModal(true);
  }

  const deleteCard =  (id) => {
       
       Swal.fire({
        title: '<p>Do you want to delete this card ?</p>',
        showCancelButton: true,
        confirmButtonText: `Delete`,
        cancelButtonText: `Cancel`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
           const formData = new FormData()
            formData.append('cardid',id)
            formData.append('setid',activeset)
             deletedbCard(getAPiToken,{cardid:id,setid:activeset}).then(res => {
                Swal.fire("Card Deleted!", "", "success");
                viewCards(activeset)
            }).catch(err => {
                console.error("Error fetching data:", err); 
            });
          
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
  }


  const isCloseM = () => {
    setShowModal(false);
    viewCards(activeset)
  }

  return (
    <div className="flex">
      {!isShowcars && <div className="main-container mx-auto">
        <div className="container lg-range:w-[98%] xl-range:max-w-[372px]"><h2 className="text-lg font-bold text-center">Sets</h2></div>
        <div className="flex justify-center">
          <div className="grid gap-4 justify-items-center w-[90%] grid-cols-1 sm-max:grid-cols-1 md-range:grid-cols-3 lg-range:grid-cols-4">
            {characters?.map((picture, index) => (
              <div key={index} className="group  h-[240px] sm-max:w-[300px] md-range:w-[230px] lg-range:!w-[280px] bg-gray-200 flex justify-center items-center rounded-lg m-2 xl-range:w-[400px]">
                <div className="flex flex-col gap-2">
                  <h1 className="text-center text-lg mt-7">{picture.name}</h1>
                  <button onClick={() => viewCards(picture._id)} className="bg-[#4CAF50] py-2 px-3 mt-5 rounded-lg text-white">Show Cards</button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>}

      {isShowcars &&
        <div className="container sm-max:w-[94%] mx-auto"><h2>View Cards</h2>

          {flashcards.length == 0 &&
            <div className="flex">
              <div className="main-container mt-4">
                <button onClick={e => getback()} className=" bg-[#4CAF50] py-2 px-3 mt-5 mb-2  rounded-lg text-white">Back</button>
              </div>
              <div className="flex flex-col gap-1 w-[80%] text-center items-center mb-2 mt-2">

                <h3 className="text-center">No Records</h3>
              </div>
            </div>
          }

        {flashcards.length > 0 && 
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
            {flashcards.map((item, index) => (
              <Draggable key={item._id} draggableId={item._id} index={index}>
                {(provided, snapshot) => (
                  <div className="outer-card-section"><div
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
                   <div className="editsection">
                      
                       <button onClick={e => editCard(item?._id)} className="w-[40%] bg-[#4CAF50] py-2 px-3 mt-2 rounded-lg text-white ">Edit</button>
                       <button onClick={e => deleteCard(item?.flashcard._id)} className=" bg-[#4CAF50] py-2 px-3 mt-2 rounded-lg text-white ">Delete</button>
                    </div>

                  {showModal && <EditModal isOpen={showModal} toggle={isCloseM} cardid={item?.flashcard?._id} /> }

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
