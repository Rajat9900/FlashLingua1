import  { useEffect, useState } from 'react';
import './StylesCard/StylesAddCards.css';

const Cards = () => {
  const [selectedCards, setSelectedCards] = useState([]);
  const [flipped, setFlipped] = useState([]);

  useEffect(() => {
    const cards = JSON.parse(localStorage.getItem('selectedCards')) || [];
    setSelectedCards(cards);
    setFlipped(Array(cards.length).fill(false));
  }, []);

  const flipCard = (index) => {
    setFlipped((prevFlipped) => {
      const newFlipped = [...prevFlipped];
      newFlipped[index] = !newFlipped[index];
      return newFlipped;
    });
  };

  return (
    <div>
      <h1 className='text-center mt-7 font-bold text-lg'> Selected Cards</h1>
      <div className=' flex justify-center'>
      <div className="selected-cards-container w-[89%] flex justify-center mt-7">
        {selectedCards.map((card, index) => (
          <div
            key={index}
            className={`selected-card ${flipped[index] ? 'flip' : ''}`}
            onClick={() => flipCard(index)}
          >
            <div className="flip-front flex justify-evenly">
              
              <img src={card.pic} alt={card.name} className='h-150 w-auto' />
              <h2>{card.name}</h2>
            </div>
            <div className="flip-back">
              <div className="flex min-h-full flex-col justify-center">
                <h1>amet consectetur adipisicing elit. Expedita, aspernatur.</h1>
                <h1>Lorem, ipsum dolor.</h1>
                <h1>ratione id perspiciatis assumenda est.</h1>
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default Cards;
