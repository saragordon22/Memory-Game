import './SingleCard.css'



export default function SingleCard({ card, handleChoice, flipped, disabled }) {

    const handleClick = () => {
      if (!disabled) {
      handleChoice(card)
      }
    }


    return (
    <div className = "card"> 
    {/* if flipped is true then flipped class will apply */}
     <div className = {flipped? "flipped" : " "}> 
         <img className="front" src= {card.src} alt ="card front" />
         <img 
         className="back" 
         src= "/images/image7.jpg" 
         //function for when back of card is clicked 
         onClick = {handleClick} 
         alt ="card back" 
         />
      </div>
    </div>
    )
}