import React, { useState, useRef, useEffect } from 'react';
import './style.css';

const data = [
  {
    id: 1,
    front: 'word1',
    back: 'wordback1',
    turn: false,
  },
  {
    id: 2,
    front: 'word2',
    back: 'wordback2',
    turn: false,
  },
  {
    id: 3,
    front: 'word3',
    back: 'wordback3',
    turn: false,
  },
];

export default function FlashCard() {
  const [card, setCard] = useState(data);
  const [crtCard, setCrtCard] = useState(0);
  const cardColor = useRef();

  const mkTurn = () => {
    card[crtCard].turn = !card[crtCard].turn;
    setCard([...card]);
  };

  const nextPage = (status) => {
    card[crtCard].turn ? mkTurn() : '';
    status === 'prev' ? setCrtCard(crtCard - 1) : setCrtCard(crtCard + 1);
  };

  useEffect(() => {
    cardColor.current.style.background = card[crtCard].turn
      ? 'yellow'
      : 'skyblue';
  }, [card[crtCard].turn]);

  return (
    <div className="board">
      <div
        className="card"
        ref={cardColor}
        onClick={() => {
          mkTurn();
        }}
      >
        {card[crtCard].turn === false
          ? card[crtCard].front
          : card[crtCard].back}
      </div>
      <div className="card-btn">
        <button disabled={crtCard === 0} onClick={() => nextPage('prev')}>
          prev
        </button>
        <button
          disabled={crtCard === card.length - 1}
          onClick={() => nextPage('next')}
        >
          next
        </button>
      </div>
    </div>
  );
}
