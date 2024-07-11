import  { useEffect, useState } from 'react';

const ShowCards = () => {
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    const card = localStorage.getItem('selectedCard');
    if (card) {
      setSelectedCard(JSON.parse(card));
    }
  }, []);

  if (!selectedCard) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{selectedCard.name}</h1>
      <img src={selectedCard.pic} alt={selectedCard.name} />
      <p>Additional card details can go here...</p>
    </div>
  );
};

export default ShowCards;




