import { useState } from "react";
import pic1 from "../../assets/pic1.png";
import pic2 from "../../assets/pic2.png";
import pic3 from "../../assets/pic3.png";
import pic4 from "../../assets/pic4.png";
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
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import './Styles/ImagesCSS.css';

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  background: isDragging ? "lightgreen" : "gray",
  width: 240,
  height: 240,
  display: "flex",
  flexDirection: "column",
  flexWrap: "wrap",
  justifyContent: "center",
  alignItems: "center",
  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "none" : "",
  padding: grid,
  width: 1300,
  display: "flex",
  flexWrap: "wrap",
  gap: 17,
  marginTop: 10
  
});

const Pictures = [
  { name: "Idea", pic: pic1 },
  { name: "Reading a journal", pic: pic2 },
  { name: "Having fun", pic: pic3 },
  { name: "Running", pic: pic4 },
  { name: "Relaxing", pic: pic5 },
  { name: "Planning", pic: pic6 },
  { name: "Checking the mail", pic: pic7 },
  { name: "Skydiving", pic: pic8 },
  { name: "Investment", pic: pic9 },
  { name: "Recycling", pic: pic10 },
  { name: "Imagination", pic: pic11 },
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
];

const Images = () => {
  const [characters, setCharacters] = useState(Pictures);
  const [flipped, setFlipped] = useState(Array(Pictures.length).fill(false));

  const flipCard = (index) => {
    setFlipped((prevFlipped) => {
      const newFlipped = [...prevFlipped];
      newFlipped[index] = !newFlipped[index];
      return newFlipped;
    });
  };

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedCharacters = reorder(
      characters,
      result.source.index,
      result.destination.index
    );

    setCharacters(reorderedCharacters);
  };

  const handleCardClick = (picture, index) => {
    const selectedCards = JSON.parse(localStorage.getItem('selectedCards')) || [];
    const updatedCards = [...selectedCards, picture];
    flipCard(index);
    localStorage.setItem('selectedCards', JSON.stringify(updatedCards));
    
     alert('card added')
  };

  return (
    <div className="flex justify-center">
      <div className="main-container">
        <div className="text-center mt-7 text-lg  font-bold">
          <h1>Images</h1>
        </div>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {characters.map((picture, index) => (
                  <Draggable key={picture.name} draggableId={picture.name} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                        className={`characters flip ${flipped[index] ? 'rotateY-180' : ''}`}
                        onClick={() => handleCardClick(picture, index)}
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
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default Images;
