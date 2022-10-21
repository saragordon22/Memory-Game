import { useEffect, useState } from 'react'
import './App.css';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import SingleCard from './Components/SingleCard';
import Help from './Components/Help';
import { isAccordionItemSelected } from 'react-bootstrap/esm/AccordionContext';

//array of cards with picture source
const cardImages =[
  {"src": "/images/image1.jpg", matched: false },
  {"src": "/images/image2.jpg", matched: false },
  {"src": "/images/image3.jpg", matched: false },
  {"src": "/images/image4.jpg", matched: false },
  {"src": "/images/image5.jpg", matched: false },
  {"src": "/images/image6.jpg", matched: false }
]

function App() {
  //state to store the cards, initially empty array
  const [cards, setCards] = useState ([])
  //set state for number of turns 
  const [turns, setTurns] = useState (0)
  //set state for the card choices the user makes
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  //set state for disabling cards 
  const [disabled, setDisabled] = useState(false)

 
  //duplicate each card, shuffle cards and give a random id 
  const shuffleCards =() => {
    const shuffledCards = [...cardImages,...cardImages]
    .sort(() => Math.random() - 0.5)
    .map((card) =>({...card, id: Math.random()}))

    setChoiceOne (null)
    setChoiceTwo (null)
    //update state with shuffled cards  
    setCards (shuffledCards)
    //set turns and match counter back to zero for each new game
    setTurns(0)
  }

  
  const handleChoice = (card) => {
  //update either choice one or two depending if there's a value in choice one
  choiceOne? setChoiceTwo(card) : setChoiceOne(card)
 }

 //compare two selected cards
 //function runs when state updated and two choices selected 
 useEffect(() => {
  if (choiceOne && choiceTwo) {
  setDisabled(true)
 
    //if two choices match update state and change matched
    if (choiceOne.src === choiceTwo.src) {
      setCards(prevCards => {
        return prevCards.map(card => {
        if (card.src === choiceOne.src) {
          return {...card, matched: true}
        //if no match then return card without change
        } else {
          return card
        }
      })
    })
      resetTurn()
    } else {
      setTimeout(() => resetTurn(), 1000)
    
      
  }
}
function alertMessage () {
  console.log (cards)
  let total = 0;

  cards.forEach(function(card){
    if (card.matched == true) {
        total += 1;
    }
  })
  if (total == 12) {
    alert ("Well done! YOU WON!")
  }
 }
alertMessage ()
 }, 
 
 [choiceOne, choiceTwo])


 //reset choices and increase turns 
 const resetTurn = () => {
  setChoiceOne (null)
  setChoiceTwo (null)
  setTurns(prevTurns => prevTurns + 1)
  setDisabled(false)
 }


//start new game initially 
useEffect(() => {
  shuffleCards()
}, [])



  return (
    <BrowserRouter forceRefresh={true}>
    <div className="App">
      <h1>Matching Game</h1>
      <button onClick= {shuffleCards}>New Game</button>
      {/* map trough the cards to create card components in a grid with image front and back */}
      <div className= "card-grid">
        {cards.map(card => (
          // importing single card and sending card as prop
          <SingleCard 
          key={card.id} 
          card= {card}
          //passing function in as a prop to single card component
          handleChoice = {handleChoice}
          //flipped prop to apply flipped class to card 
          flipped ={card === choiceOne || card === choiceTwo || card.matched}
          //disabled prop so cards can't be clicked 
          disabled = {disabled}
          />
         
        ))}

      </div>
      <p>Turns:{turns}</p>
      <Link to="/Help">
        <button className = "">Help</button>
      </Link>
      <Route exact={true} path="/Help" component={Help}/> 
    </div>
    </BrowserRouter>
  );
}

export default App;
